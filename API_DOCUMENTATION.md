# WAZA Proposal Generator API Documentation

## Overview

The WAZA Proposal Generator API allows you to programmatically generate professional business proposals using AI. This REST API is perfect for integration with automation tools like n8n, Zapier, or custom applications.

**Base URL**: `http://localhost:3001/api`

## Authentication

The API supports two methods for providing the Anthropic API key:
1. **Request Body**: Include `anthropicApiKey` in your POST request
2. **Environment Variable**: Set `ANTHROPIC_API_KEY` on the server

## Endpoints

### 1. Health Check

**GET** `/health`

Check if the API server is running.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "WAZA Proposal Generator API",
  "version": "1.0.0"
}
```

### 2. Get Pricing Regions

**GET** `/proposals/regions`

Get all available pricing regions and their hourly rates.

**Response:**
```json
{
  "success": true,
  "data": {
    "regions": [
      {
        "id": "mexico",
        "name": "Mexico",
        "hourlyRate": 25,
        "currency": "USD",
        "symbol": "$"
      },
      {
        "id": "us",
        "name": "United States",
        "hourlyRate": 75,
        "currency": "USD",
        "symbol": "$"
      },
      {
        "id": "europe",
        "name": "Europe",
        "hourlyRate": 65,
        "currency": "USD",
        "symbol": "$"
      }
    ],
    "count": 3
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 3. Generate Proposal

**POST** `/proposals/generate`

Generate a comprehensive business proposal.

**Request Body:**
```json
{
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "projectTitle": "E-commerce Website Development",
  "serviceDescription": "Development of a modern e-commerce platform with payment integration and inventory management",
  "deliverables": "Responsive website design\nPayment gateway integration\nInventory management system\nUser authentication\nAdmin dashboard",
  "costItems": [
    {
      "description": "Frontend Development",
      "hours": 40
    },
    {
      "description": "Backend Development",
      "hours": 60
    },
    {
      "description": "Testing & Deployment",
      "hours": 20
    }
  ],
  "timelineItems": [
    {
      "milestone": "Design & Planning Phase",
      "startDate": "2024-02-01",
      "duration": 2,
      "durationUnit": "weeks"
    },
    {
      "milestone": "Development Phase",
      "startDate": "2024-02-15",
      "duration": 6,
      "durationUnit": "weeks"
    },
    {
      "milestone": "Testing & Launch",
      "startDate": "2024-03-28",
      "duration": 2,
      "durationUnit": "weeks"
    }
  ],
  "language": "English",
  "customTerms": "Additional custom terms and conditions...",
  "anthropicApiKey": "sk-your-anthropic-api-key-here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "clientDetails": {
      "name": "John Doe",
      "company": "E-commerce Website Development",
      "email": "john@example.com"
    },
    "serviceDetails": {
      "description": "AI-generated executive summary...",
      "scope": [
        "Responsive website design",
        "Payment gateway integration",
        "Inventory management system",
        "User authentication",
        "Admin dashboard"
      ]
    },
    "timeline": [
      {
        "milestone": "Design & Planning Phase",
        "startDate": "2024-02-01",
        "duration": 2,
        "durationUnit": "weeks"
      }
    ],
    "regionalProposals": [
      {
        "region": {
          "id": "mexico",
          "name": "Mexico",
          "hourlyRate": 25,
          "currency": "USD",
          "symbol": "$"
        },
        "costItems": [
          {
            "description": "Frontend Development",
            "hours": 40,
            "hourlyRate": 25,
            "totalCost": 1000
          }
        ],
        "totalCost": 3000,
        "executiveSummary": "AI-generated executive summary...",
        "scopeOfWork": "AI-generated detailed scope...",
        "terms": "AI-generated terms and conditions..."
      }
    ],
    "customTerms": "Additional custom terms...",
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Request Schema

### ProposalRequest

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `clientName` | string | ✅ | Client's name (2-100 characters) |
| `clientEmail` | string | ✅ | Valid email address |
| `projectTitle` | string | ✅ | Project title (5-200 characters) |
| `serviceDescription` | string | ✅ | Service description (20-2000 characters) |
| `deliverables` | string | ✅ | List of deliverables (10-2000 characters) |
| `costItems` | CostItem[] | ✅ | Array of cost items (1-20 items) |
| `timelineItems` | TimelineItem[] | ✅ | Array of timeline items (1-20 items) |
| `language` | string | ❌ | "English" or "Spanish" (default: "English") |
| `customTerms` | string | ❌ | Custom terms (max 5000 characters) |
| `anthropicApiKey` | string | ❌ | Anthropic API key (if not set in env) |

### CostItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | ✅ | Task description (3-200 characters) |
| `hours` | number | ✅ | Estimated hours (0.5-10000) |

### TimelineItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `milestone` | string | ✅ | Milestone name (3-200 characters) |
| `startDate` | string | ✅ | ISO 8601 date format |
| `duration` | number | ✅ | Duration value (1-365) |
| `durationUnit` | string | ✅ | "days", "weeks", or "months" |

## Error Handling

All errors return this format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "status": 400,
    "details": [
      {
        "field": "clientName",
        "message": "Client name must be between 2 and 100 characters",
        "value": "A"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/proposals/generate"
}
```

### Common Error Codes

- **400**: Bad Request - Invalid input data
- **401**: Unauthorized - Invalid or missing API key
- **429**: Too Many Requests - Rate limit exceeded
- **500**: Internal Server Error - Server or AI service error

## n8n Integration Example

Here's how to integrate with n8n:

### 1. HTTP Request Node Configuration

- **Method**: POST
- **URL**: `http://your-server:3001/api/proposals/generate`
- **Headers**: 
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Body**: Use the JSON schema above

### 2. Sample n8n Workflow

```json
{
  "nodes": [
    {
      "parameters": {
        "method": "POST",
        "url": "http://localhost:3001/api/proposals/generate",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": {
          "clientName": "{{ $json.clientName }}",
          "clientEmail": "{{ $json.clientEmail }}",
          "projectTitle": "{{ $json.projectTitle }}",
          "serviceDescription": "{{ $json.serviceDescription }}",
          "deliverables": "{{ $json.deliverables }}",
          "costItems": "{{ $json.costItems }}",
          "timelineItems": "{{ $json.timelineItems }}",
          "anthropicApiKey": "{{ $env.ANTHROPIC_API_KEY }}"
        }
      },
      "type": "n8n-nodes-base.httpRequest",
      "name": "Generate Proposal"
    }
  ]
}
```

## Rate Limits

- **Default**: 100 requests per 15 minutes per IP
- **Recommendation**: Implement exponential backoff for retries

## Best Practices

1. **API Key Security**: Never expose API keys in client-side code
2. **Input Validation**: Validate data before sending to API
3. **Error Handling**: Always handle both success and error responses
4. **Caching**: Consider caching results for identical requests
5. **Monitoring**: Log API calls for debugging and usage tracking

## Example cURL Request

```bash
curl -X POST http://localhost:3001/api/proposals/generate \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "John Doe",
    "clientEmail": "john@example.com",
    "projectTitle": "Website Development",
    "serviceDescription": "Modern responsive website",
    "deliverables": "Frontend\nBackend\nTesting",
    "costItems": [
      {"description": "Development", "hours": 40}
    ],
    "timelineItems": [
      {
        "milestone": "Development",
        "startDate": "2024-02-01",
        "duration": 4,
        "durationUnit": "weeks"
      }
    ],
    "anthropicApiKey": "sk-your-key-here"
  }'
```

## Support

For API issues or questions:
- Check the `/health` endpoint first
- Review error messages and status codes
- Ensure your Anthropic API key is valid and has credits

---

**Powered by WAZA Lab using Claude AI**