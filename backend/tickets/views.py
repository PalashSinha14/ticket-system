#from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Ticket
from .serializers import TicketSerializer
from django.db.models import Q

class TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        category = self.request.query_params.get('category')
        priority = self.request.query_params.get('priority')
        status = self.request.query_params.get('status')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category=category)

        if priority:
            queryset = queryset.filter(priority=priority)

        if status:
            queryset = queryset.filter(status=status)

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset


class TicketUpdateView(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Avg
from django.db.models.functions import TruncDate

class TicketStatsView(APIView):
    def get(self, request):
        total_tickets = Ticket.objects.count()
        open_tickets = Ticket.objects.filter(status='open').count()

        # Avg tickets per day
        tickets_per_day = (
            Ticket.objects
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
        )

        avg_tickets_per_day = (
            sum(day['count'] for day in tickets_per_day) / len(tickets_per_day)
            if tickets_per_day else 0
        )

        # Priority breakdown
        priority_data = (
            Ticket.objects
            .values('priority')
            .annotate(count=Count('id'))
        )

        priority_breakdown = {
            item['priority']: item['count']
            for item in priority_data
        }

        # Category breakdown
        category_data = (
            Ticket.objects
            .values('category')
            .annotate(count=Count('id'))
        )

        category_breakdown = {
            item['category']: item['count']
            for item in category_data
        }

        return Response({
            "total_tickets": total_tickets,
            "open_tickets": open_tickets,
            "avg_tickets_per_day": round(avg_tickets_per_day, 2),
            "priority_breakdown": priority_breakdown,
            "category_breakdown": category_breakdown,
        })


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class TicketClassifyView(APIView):
    def post(self, request):
        description = request.data.get("description")

        if not description:
            return Response(
                {"error": "Description is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a support ticket classifier."
                    },
                    {
                        "role": "user",
                        "content": f"""
Categorize the following support ticket into one of:
billing, technical, account, general

Also assign a priority:
low, medium, high, critical

Return ONLY JSON in this format:
{{"category": "...", "priority": "..."}}

Ticket:
{description}
"""
                    }
                ],
                temperature=0
            )

            content = response.choices[0].message.content

            # Try parsing response safely
            import json
            parsed = json.loads(content)

            return Response({
                "suggested_category": parsed.get("category"),
                "suggested_priority": parsed.get("priority"),
            })

        except Exception as e:
            # IMPORTANT: graceful failure
            return Response({
                "suggested_category": None,
                "suggested_priority": None,
                "error": "LLM unavailable"
            })