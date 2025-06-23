# Media Planning Tool Listing SOP
## Standard Operating Procedure for Adding New Tools to the Directory

This guide outlines the complete process for researching, analyzing, and creating high-quality listings for media planning tools in the directory. The system now includes **automated logo integration** via Clearbit API, eliminating the need for manual logo management.

## Automated Logo System 🎨

### Logo Integration Overview
The directory now features **automated logo loading** using the Clearbit API:

- **Automatic Logo Fetching**: Logos are automatically pulled from company URLs using Clearbit's logo service
- **Smart Domain Extraction**: The system intelligently extracts the correct domain from complex URLs
- **3-Tier Fallback System**: Ensures every tool always displays a professional image
- **No Manual Work Required**: Simply provide the company URL in the `link` field

### How Logo System Works
1. **Primary**: Clearbit logo from company domain (`https://logo.clearbit.com/domain.com`)
2. **Secondary**: UI Avatars with company initials and branded colors
3. **Tertiary**: Text-based display with company name

### Special Domain Handling
The system automatically handles complex URLs:
- `advertising.amazon.com` → `amazon.com` (for Amazon DSP)
- `business.facebook.com` → `facebook.com` (for Meta Business Manager)
- `business.linkedin.com` → `linkedin.com` (for LinkedIn Campaign Manager)
- `ads.tiktok.com` → `tiktok.com` (for TikTok Ads Manager)
- `marketingplatform.google.com` → `google.com` (for Google DV360)
- `business.adobe.com` → `adobe.com` (for Adobe Advertising Cloud)

### Logo Requirements for New Tools
- ✅ **Required**: Valid company URL in the `link` field
- ✅ **Automatic**: Logo fetching handled by the system
- ❌ **Not Required**: Manual logo upload or image files
- ❌ **Not Required**: Logo field in frontmatter (system uses URL)

## Step 1: Initial Research with Perplexity

Use the Perplexity MCP to gather comprehensive background information about the tool.

### Research Questions to Ask:
```
1. "What is [Tool Name] and what are its main features for media planning?"
2. "Who are the target users and ideal customers for [Tool Name]?"
3. "What are the key competitive advantages of [Tool Name] compared to other media planning tools?"
4. "What pricing model and specific pricing tiers does [Tool Name] use?"
5. "What are the main use cases and success stories for [Tool Name]?"
6. "What integrations and technical capabilities does [Tool Name] offer?"
7. "What ROI metrics, time savings, or efficiency improvements does [Tool Name] provide?"
8. "What enterprise features does [Tool Name] offer for large teams and agencies?"
9. "What is the implementation timeline and support process for [Tool Name]?"
10. "What security certifications and compliance features does [Tool Name] have?"
11. "What are the specific contract terms, minimum commitments, and setup costs for [Tool Name]?"
```

### Expected Research Output:
- Company background and founding information
- Core functionality and features
- Target market and user personas
- Competitive positioning
- Pricing model (if available)
- Notable clients or case studies

## Step 2: Website Content Extraction with Firecrawl

Use firecrawl to scrape the tool's website for detailed information.

### Pages to Scrape:
1. **Homepage** - Overall value proposition and key messaging
2. **Features/Product page** - Detailed functionality breakdown
3. **Pricing page** - Pricing tiers, implementation costs, and contract terms
4. **Enterprise/Business page** - Enterprise features, security, and compliance info
5. **Integrations page** - Technical integrations and API capabilities
6. **Support/Services page** - Implementation timeline, training, and support details
7. **About/Company page** - Company background and team
8. **Case Studies/Customers page** - Success stories, ROI metrics, and testimonials
9. **Blog/Resources** - Recent content showing thought leadership and benchmarks

### Firecrawl Implementation:
```typescript
// Example scraping workflow
1. Scrape homepage for main value proposition
2. Scrape /features or /product for detailed capabilities
3. Scrape /pricing for cost information
4. Scrape /about for company background
5. Extract key messaging and unique selling points
```

## Step 3: Content Analysis and Synthesis

Combine research from Perplexity and firecrawl to create a comprehensive understanding of the tool.

### Key Elements to Extract:
- **Value Proposition**: What problem does this tool solve?
- **Core Features**: What are the 3-5 main capabilities?
- **Target Users**: Who specifically benefits from this tool?
- **Differentiation**: What makes this tool unique?
- **Use Cases**: When would someone choose this tool?
- **Technical Details**: What integrations, APIs, or technical specs matter?
- **Business Impact**: What ROI, time savings, or efficiency metrics are provided?
- **Enterprise Capabilities**: How does it handle large teams, multi-client management, permissions?
- **Implementation Process**: Timeline, training, support, and onboarding details
- **Security & Compliance**: Certifications, data protection, enterprise security features
- **Pricing Details**: Specific costs, tiers, setup fees, contract terms, minimum commitments

## Step 4: Categorization and Tagging

Assign appropriate tags using our **dual tag system** - both functional tags (what the tool does) and user-type tags (who uses it):

### Functional Tags:
- `media-planning` - Core media planning functionality 📊
- `budget-planning` - Budget allocation and financial management 💰
- `multi-channel` - Cross-channel campaign coordination 🔄
- `audience-analytics` - Audience insights and targeting 👥
- `media-buying` - Media purchasing and buying automation 🛒
- `mmm` - Marketing Mix Modeling capabilities 🧮
- `fast` - Tools focused on speed and efficiency ⚡
- `featured` - Featured/sponsored tools ⭐

### User-Type Tags:
- `cmos` - Chief Marketing Officers and senior marketing executives 👤
- `media-planners` - Media planning specialists and strategists 👤
- `marketing-directors` - Marketing directors and campaign managers 👤
- `agencies` - Media agencies, full-service agencies, and independent agencies 👤
- `in-house-teams` - Brand direct and in-house marketing teams 👤
- `data-analysts` - Data analysts and performance marketers 👤
- `budget-managers` - Budget managers and financial planners 👤

### Tagging Guidelines:
- Use 4-8 tags total (2-4 functional + 2-4 user-type)
- Always include the primary function tag(s)
- Always include 2-4 user-type tags based on targetUsers data
- Add `fast` for tools that emphasize speed/efficiency
- Be specific - quality over quantity
- **Never add `featured` tag unless explicitly instructed**

### User Tag Mapping Reference:
Map from `targetUsers` field to user tags:
- "Media Agencies", "Media agency" → `agencies`
- "Full Service Agencies", "Independent agencies" → `agencies`
- "Brand Direct/In-House" → `in-house-teams`
- "Media Planners" → `media-planners`
- "Marketing Directors", "Marketers" → `marketing-directors`
- "Budget managers" → `budget-managers`
- "Data analysts", "Performance marketers" → `data-analysts`
- "CMOs", "Chief Marketing Officers" → `cmos`

## Target Audience Reference List

When identifying target users, choose from this comprehensive list of audience types:

### Company Types:
- **Holding Companies** - Large agency networks (WPP, Omnicom, Publicis, IPG, etc.)
- **Independent Agencies** - Standalone agencies not part of holding company networks
- **Media Agencies** - Agencies focused specifically on media planning and buying
- **Full Service Agencies** - Agencies offering complete marketing services
- **Digital Agencies** - Agencies specializing in digital marketing and advertising
- **Creative Agencies** - Agencies focused on creative development and brand work
- **Boutique Agencies** - Small, specialized agencies serving niche markets
- **Brand Direct/In-House** - Internal marketing teams at brands and companies
- **Consultancies** - Management consulting firms with marketing practices

### Company Sizes:
- **Enterprise** - Large corporations (1000+ employees)
- **Mid-Market** - Medium-sized companies (100-1000 employees)
- **Small Business** - Small companies (10-100 employees)
- **Startups** - Early-stage companies seeking growth
- **SMBs** - Small and medium businesses combined category

### Roles & Functions:
- **Media Planners** - Professionals developing media strategies and plans
- **Media Strategists** - Senior professionals setting media direction
- **Media Buyers** - Professionals purchasing and managing media inventory
- **Campaign Managers** - Professionals overseeing campaign execution
- **Marketing Managers** - Professionals managing marketing initiatives
- **Performance Marketers** - Professionals focused on measurable outcomes
- **Growth Teams** - Teams focused on business growth and acquisition
- **Data Analysts** - Professionals analyzing marketing and media data
- **Brand Managers** - Professionals managing brand strategy and positioning
- **Marketing Directors** - Senior marketing leadership
- **CMOs** - Chief Marketing Officers and senior executives
- **Account Managers** - Client-facing agency professionals

### Market Specializations:
- **B2B Marketers** - Professionals marketing to business customers
- **B2C Marketers** - Professionals marketing to consumer customers
- **E-commerce Brands** - Online retail and direct-to-consumer companies
- **Local Businesses** - Businesses serving local/regional markets
- **Global Brands** - International companies with worldwide presence
- **Retail Brands** - Companies in retail and consumer goods
- **SaaS Companies** - Software-as-a-Service businesses
- **Financial Services** - Banks, insurance, and financial companies
- **Healthcare Organizations** - Medical and pharmaceutical companies

### Team Types:
- **Marketing Teams** - General marketing departments
- **Media Teams** - Dedicated media planning and buying teams
- **Performance Teams** - Teams focused on ROI and performance metrics
- **Brand Teams** - Teams focused on brand building and awareness
- **Digital Teams** - Teams specializing in digital marketing channels
- **Analytics Teams** - Teams focused on data analysis and insights
- **Campaign Teams** - Cross-functional teams managing specific campaigns
- **Client Teams** - Agency teams serving specific client accounts

## Step 5: Creating the Markdown File

Create a new `.md` file in `astro-template/src/data/directory/` following this structure:

### Required Frontmatter Fields:
```yaml
---
id: tool-name-kebab-case
title: Tool Name
description: One-sentence description focusing on primary value proposition
tags:
  # Functional tags (what the tool does)
  - media-planning
  - budget-planning
  - multi-channel
  # User-type tags (who uses it)
  - agencies
  - media-planners
  - marketing-directors
  - in-house-teams
link: https://www.toolwebsite.com/  # Required for automated logo fetching
featured: false  # Only set to true when explicitly instructed
targetUsers:
  - Primary user type (from reference list above)
  - Secondary user type (from reference list above)
  - Tertiary user type (from reference list above)
functionality:
  - Core function 1
  - Core function 2
  - Core function 3
  - Core function 4
pricing: Enterprise/Subscription/Freemium/Free
category: Descriptive Category Name
---
```

**Note**: The `link` field is now **required** for automated logo fetching via Clearbit API. No manual logo upload needed.

### Content Structure Template:
```markdown
**[Compelling headline that captures the tool's main value]**

[2-3 sentence overview paragraph explaining what the tool does and who it's for]

## Key Features

### 🎯 **[Feature Category 1]**
- Specific capability 1
- Specific capability 2
- Specific capability 3

### 📊 **[Feature Category 2]**
- Specific capability 1
- Specific capability 2
- Specific capability 3

### 🚀 **[Feature Category 3]**
- Specific capability 1
- Specific capability 2
- Specific capability 3

[Additional feature sections as needed]

## Business Impact

[Include this section for enterprise/professional tools - focus on ROI and measurable outcomes]

- **[X]% reduction** in [specific task/process] (with benchmark/source if available)
- **[X]% improvement** in [performance metric] through [specific capability]
- **Cost savings** of $[amount] per month/year through [specific efficiency]
- **Time savings** of [X hours] per week/campaign for [specific role]

## Enterprise Features

[Include this section for tools targeting agencies and large teams]

### 🏢 **Team & Client Management**
- Multi-client workspace management with custom branding
- Advanced user permissions and approval workflows
- Team collaboration and project management capabilities
- Client portal and reporting access

### 🔗 **Integrations & Technical**
- API integrations with [X]+ ad tech platforms
- Direct connections to [specific DSPs/SSPs/systems]
- Data import/export capabilities (CSV, API, automated feeds)
- Single sign-on (SSO) and enterprise security compliance

### 🛡️ **Security & Compliance**
- SOC 2 Type II certification (if applicable)
- GDPR/CCPA compliance features
- Enterprise-grade data security
- Custom data retention policies

## Getting Started

### 📋 **Implementation Timeline**
- **Week 1-2**: Initial setup and data migration
- **Week 3-4**: Team training and workflow configuration
- **Ongoing**: Dedicated account management and support

### 🎓 **Training & Support**
- White-glove onboarding with dedicated specialist
- Comprehensive training program for all user levels
- 24/7 support with [response time] SLA
- Regular check-ins and optimization recommendations

### 💰 **Investment Details**
[Be as specific as possible about pricing]
- **Starter Plan**: $[X]/month for up to [X] users
- **Professional Plan**: $[X]/month for [X] users, includes [specific features]
- **Enterprise Plan**: Custom pricing, includes [enterprise features]
- **Setup/Implementation**: One-time fee of $[X] (if applicable)
- **Contract Terms**: [Minimum commitment] with [cancellation policy]

## Perfect For

- **[User Type 1]**: Specific benefit/use case and why this tool is ideal
- **[User Type 2]**: Specific benefit/use case and why this tool is ideal
- **[User Type 3]**: Specific benefit/use case and why this tool is ideal

## Why Choose [Tool Name]?

✅ **[Key Differentiator 1]**: Specific competitive advantage and outcome  
✅ **[Key Differentiator 2]**: Specific competitive advantage and outcome  
✅ **[Key Differentiator 3]**: Specific competitive advantage and outcome  
✅ **[Proven Results]**: Customer success metric or industry recognition  

[Visit Tool Name →](https://www.toolwebsite.com/)
```

## Step 6: Content Quality Guidelines

### Writing Best Practices:
1. **Lead with Value**: Start with the primary benefit/outcome
2. **Be Specific**: Use concrete features, not generic marketing speak
3. **User-Focused**: Frame everything from the user's perspective
4. **Scannable**: Use bullet points, emojis, and clear headings
5. **Action-Oriented**: Use active voice and strong verbs

### Description Guidelines:
- **Frontmatter Description**: 1 sentence, focus on primary value prop
- **Headline**: Should be compelling and outcome-focused
- **Overview**: 2-3 sentences max, explain what + who + why
- **Features**: Group into logical categories with descriptive icons
- **Perfect For**: Be specific about user types and use cases

### Content Tone:
- Professional but accessible
- Confident without being overly promotional  
- Factual and evidence-based
- Helpful and informative

## Step 7: Quality Assurance Checklist

Before finalizing, verify:

### Technical Requirements:
- [ ] Unique ID in kebab-case format
- [ ] Correct URL format in link field (required for automated logo fetching)
- [ ] Appropriate functional tags selected (2-4 tags from functional category)
- [ ] Appropriate user-type tags selected (2-4 tags from user-type category)
- [ ] Total tags between 4-8 (balanced functional + user-type)
- [ ] Featured status set to false (unless explicitly instructed otherwise)
- [ ] All required frontmatter fields completed
- [ ] User tags match the targetUsers field content
- [ ] Link field contains valid company URL for logo system

### Content Quality:
- [ ] Description is concise and compelling
- [ ] Features are grouped logically with clear icons
- [ ] Target users are specific and actionable
- [ ] Benefits are unique to this tool
- [ ] Business impact section includes specific metrics (when available)
- [ ] Enterprise features section addresses team/client management (for applicable tools)
- [ ] Implementation details provide realistic timelines and expectations
- [ ] Pricing information is as specific as research allows
- [ ] Perfect For section explains WHY this tool is ideal for each user type
- [ ] Why Choose section focuses on competitive differentiators
- [ ] No grammar or spelling errors
- [ ] External link works correctly

### Competitive Analysis:
- [ ] Positioning is differentiated from similar tools
- [ ] Value proposition is clear and unique
- [ ] Content doesn't duplicate existing listings
- [ ] Tool fits the media planning niche appropriately

## Step 8: Implementation and Testing

1. **Create the file** in the correct directory
2. **Test locally** to ensure proper rendering
3. **Verify logo loading** - Check that Clearbit logo appears correctly
4. **Verify categorization** by checking tag pages
5. **Test external link** functionality
6. **Review on different screen sizes** for readability

## Senior Decision-Maker Requirements

When creating listings for tools that will be evaluated by senior media directors, marketing directors, and procurement teams, ensure you address these critical decision factors:

### **Business Case Requirements:**
- **ROI Justification**: Include specific metrics on time savings, cost reduction, or performance improvements
- **Scalability Evidence**: Show how the tool handles growth in team size, client count, or campaign volume
- **Competitive Advantage**: Clearly articulate what makes this tool superior to alternatives
- **Risk Mitigation**: Address security, compliance, and business continuity considerations

### **Implementation Considerations:**
- **Resource Requirements**: Be upfront about time, personnel, and budget needed for implementation
- **Change Management**: Address how the tool fits into existing workflows and team structures
- **Training Investment**: Specify onboarding time and ongoing education requirements
- **Integration Effort**: Detail technical setup and system integration complexity

### **Procurement Information:**
- **Total Cost of Ownership**: Include all costs - licensing, setup, training, ongoing support
- **Contract Flexibility**: Address minimum commitments, scalability options, and exit terms
- **Vendor Stability**: Include information about company background and financial stability
- **Support Quality**: Specify response times, account management, and escalation processes

### **Decision Validation:**
- **Peer Social Proof**: Include customer testimonials from similar companies/roles
- **Industry Recognition**: Mention awards, analyst reports, or industry certifications
- **Success Metrics**: Provide concrete examples of customer outcomes
- **Trial/Pilot Options**: Mention evaluation opportunities before full commitment

## Advanced Tips

### For Premium/Enterprise Tools:
- Include more detailed feature breakdown
- Add specific ROI/efficiency benefits
- Include industry recognition or awards
- Mention notable customer logos if available

### For Niche Tools:
- Be very specific about the use case
- Explain when this tool is the best choice
- Include technical specifications if relevant
- Address specific pain points this tool solves

### For Enterprise Tools:
- Focus on scalability and integration capabilities
- Mention enterprise security/compliance features
- Include implementation and support details
- Address ROI and business impact

## Common Mistakes to Avoid

1. **Generic descriptions** - Be specific about what the tool does
2. **Unbalanced tagging** - Missing either functional or user-type tags
3. **Over-tagging** - More than 8 tags total reduces effectiveness
4. **Marketing fluff** - Focus on concrete capabilities
5. **Wrong categorization** - Ensure tags match actual functionality AND target users
6. **Incomplete research** - Always scrape website + use Perplexity
7. **Copy-paste content** - Each listing should be unique and tailored
8. **Missing target users** - Always specify who should use this tool
9. **Mismatched user tags** - User tags should align with targetUsers field
10. **Functional-only tagging** - Always include both functional AND user-type tags
11. **Invalid URLs** - Ensure link field contains valid company URL for logo system
12. **Manual logo attempts** - Don't try to add logos manually, system handles this automatically

## Research Tools Reference

### Perplexity MCP Commands:
- Research company background and positioning
- Gather competitive intelligence
- Find pricing and business model info
- Discover use cases and customer stories

### Firecrawl MCP Commands:
- `mcp_firecrawl-mcp_firecrawl_scrape` - Single page content extraction
- `mcp_firecrawl-mcp_firecrawl_map` - Discover all URLs on site
- `mcp_firecrawl-mcp_firecrawl_search` - Find specific information across web

### Recommended Scraping Strategy:
1. Map the website to find all relevant pages
2. Scrape homepage for main value prop
3. Scrape product/features page for capabilities
4. Scrape pricing page for model information
5. Search for case studies and customer testimonials

---

**Note**: Always respect website terms of service and rate limits when scraping. Use firecrawl responsibly and focus on publicly available information only. 