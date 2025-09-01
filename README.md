# WAZA Lab - Business Proposal Generator

An AI-powered business proposal generator that transforms basic project information into professional, comprehensive business proposals in minutes.

## 🚀 Features

### Core Functionality
- **AI-Powered Content Generation**: Uses Anthropic's Claude API to create detailed, professional proposal content
- **Multi-Regional Pricing**: Automatic pricing calculations for Mexico, US, and Europe with region-specific hourly rates
- **Real-Time Preview**: Live preview of your proposal as you build it
- **Professional Export**: Download proposals as PDF or Word documents
- **Bilingual Support**: Full support for English and Spanish

### Customization Options
- **Professional Templates**: Multiple styling options including fonts, colors, gradients, and borders
- **Company Branding**: Add your company logo, title, and custom branding
- **Flexible Pricing**: Customizable cost items with hourly rate calculations
- **Timeline Management**: Project milestone planning with flexible duration units
- **Custom Terms**: Add your own terms and conditions

## 📋 How It Works

### 1. Input Basic Information
Fill out the simple form with:
- **Client Details**: Name, email, project title
- **Service Description**: Brief description of services to be provided
- **Deliverables**: List of expected outcomes
- **Cost Items**: Tasks with estimated hours
- **Timeline**: Project milestones with durations
- **Anthropic API Key**: Required for AI content generation

### 2. AI Enhancement
The system uses Claude AI to transform your basic input into:
- **Executive Summary**: 4-5 paragraph comprehensive overview including market context, value proposition, and ROI projections
- **Detailed Scope of Work**: Professional breakdown with methodologies, quality assurance protocols, and success metrics
- **Terms & Conditions**: Comprehensive professional terms including payment schedules, IP rights, and warranties

### 3. Regional Pricing
Automatic calculation across three markets:
- **Mexico**: $25/hour base rate
- **United States**: $75/hour base rate  
- **Europe**: $65/hour base rate

### 4. Professional Output
Generate polished proposals with:
- Professional formatting and design
- Detailed cost breakdowns with totals
- Timeline visualization
- Export-ready documents

## 🏗️ Output Structure

The generated proposal includes these sections:

### Executive Summary
- Current market context and business opportunity analysis
- Client's specific pain points and strategic objectives
- WAZA Lab's unique value proposition and competitive differentiators
- Proven methodology and technical expertise
- Quantifiable benefits, ROI projections, and business impact
- Risk mitigation and success guarantee framework
- Timeline efficiency and resource optimization

### Scope of Work
- Detailed phase-by-phase breakdown with specific deliverables
- Technical architecture and implementation methodology
- Quality assurance protocols and testing frameworks
- Documentation standards and knowledge transfer processes
- Performance benchmarks and success metrics
- Risk assessment and mitigation strategies
- Communication workflows and reporting cadence
- Post-delivery support and maintenance protocols
- Compliance and security considerations

### Cost Breakdown
- Itemized list of services with hours and rates
- Regional pricing variations
- Subtotals and final totals
- Professional formatting

### Timeline
- Project milestones with start dates
- Duration estimates in weeks/months/days
- Visual timeline representation

### Terms & Conditions (AI-Generated)
- Payment schedules and milestone-based billing
- Intellectual property rights and ownership
- Project scope change management procedures
- Quality guarantees and performance warranties
- Confidentiality and data protection clauses
- Dispute resolution and escalation processes
- Project termination and deliverable handover protocols
- Liability limitations and indemnification terms
- Force majeure and unforeseen circumstances provisions

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **AI Integration**: Anthropic Claude API (claude-3-5-sonnet)
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Export**: jsPDF + docx for document generation
- **Internationalization**: i18next for bilingual support
- **Development**: ESLint + TypeScript for code quality

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Anthropic API key

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:5173 in your browser

### API Key Setup
1. Get an Anthropic API key from https://console.anthropic.com
2. Enter your API key in the form when generating proposals
3. The key is only used for that session and not stored

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── landing.tsx         # Landing page
│   ├── home.tsx           # Main app interface
│   ├── ProposalForm.tsx   # Form component
│   ├── ProposalPreview.tsx # Preview component
│   └── app-layout.tsx     # App layout wrapper
├── lib/
│   ├── anthropic.ts       # AI integration
│   ├── pricingRegions.ts  # Regional pricing logic
│   └── i18n.ts           # Internationalization setup
└── types/
    └── supabase.ts        # Type definitions
```

## 🎯 Use Cases

Perfect for:
- **Freelancers**: Create professional proposals that compete with agencies
- **Consultants**: Generate detailed project scopes with minimal effort
- **Agencies**: Standardize proposal quality across teams
- **Service Providers**: Impress clients with comprehensive documentation
- **International Teams**: Multi-regional pricing for global clients

## 💡 Tips for Best Results

1. **Be Specific**: Provide detailed service descriptions for better AI-generated content
2. **Accurate Time Estimates**: Enter realistic hour estimates for proper pricing
3. **Clear Deliverables**: List specific outcomes for comprehensive scope generation
4. **Review & Edit**: AI-generated content can be customized after generation
5. **Regional Considerations**: Choose the appropriate region for your client's market

## 🔒 Privacy & Security

- API keys are only used during the session and not stored
- No proposal data is saved on servers
- All processing happens client-side where possible
- Generated proposals remain private to the user

## 📄 License

© 2024 WAZA Lab. All rights reserved.

---

**Powered by WAZA Lab using Claude AI**