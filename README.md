# Media Planning Tools Directory

A comprehensive directory of the best media planning software and tools for 2025, built with Astro and TypeScript.

## 🚀 Live Website

Visit the live directory at: [Media Planning Tools](https://mediaplanningtool.com)

## 📋 Features

- **43+ Media Planning Tools** - Comprehensive directory with detailed profiles
- **2025 Selection Guide** - In-depth guide to choosing the right media planning tool
- **Advanced Search & Filtering** - Find tools by category, use case, and user type
- **Responsive Design** - Multiple themes (Spearmint, Peppermint, Hemingway, Brookmint)
- **SEO Optimized** - Built for search engine visibility
- **Blog System** - Industry insights and tool comparisons
- **Fast Performance** - Built with Astro for optimal speed

## 🛠️ Tech Stack

- **Framework**: Astro
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with frontmatter
- **Icons**: Tabler Icons
- **Search**: Client-side search with filtering

## 📁 Project Structure

```
├── astro-template/          # Main website application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── data/           # Content and data files
│   │   │   │   ├── directory/  # Tool profiles and listings
│   │   │   │   ├── pages/      # Static pages (including 2025 Guide)
│   │   │   │   └── blog/       # Blog posts
│   │   │   ├── layouts/        # Page layouts
│   │   │   ├── pages/          # Route pages
│   │   │   └── config/         # Configuration and themes
├── BLOG_POST_SOP.md        # Blog writing guidelines
├── TOOL_LISTING_SOP.md     # Tool submission guidelines
└── PRD.md                  # Product requirements
```

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/matthewhalliard/mediaplanningtool.git
   cd mediaplanningtool
   ```

2. **Navigate to the project**
   ```bash
   cd astro-template
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Directory Categories

### Functional Categories
- **Media Planning** - Core planning and strategy tools
- **Budget Planning** - Financial planning and allocation
- **Multi-Channel** - Cross-platform campaign management
- **Audience Analytics** - Targeting and insights
- **Media Buying** - Inventory purchasing platforms
- **Marketing Mix Modeling** - Attribution and ROI analysis

### User Types
- **Agencies** - Multi-client management tools
- **In-House Teams** - Brand-direct solutions
- **CMOs** - Executive-level platforms
- **Media Planners** - Specialist planning tools
- **Data Analysts** - Analytics-focused solutions

## 🎯 2025 Selection Guide

The repository includes a comprehensive [2025 Guide to Selecting a Media Planning Tool](./astro-template/src/data/pages/guide-2025.mdx) covering:

- **Goal Definition** - Identifying your planning objectives
- **Agency vs. In-House** - Tailored recommendations by organization type
- **Budget Considerations** - Pricing models and total cost of ownership
- **Local vs. National** - Scale-specific requirements
- **Evaluation Framework** - Decision-making criteria

## 🤝 Contributing

We welcome contributions! Please see our [Tool Listing SOP](./TOOL_LISTING_SOP.md) for guidelines on adding new tools.

### Adding a New Tool

1. Create a new markdown file in `astro-template/src/data/directory/`
2. Use the frontmatter schema defined in `astro-template/src/validation/directory.ts`
3. Follow the content guidelines in `TOOL_LISTING_SOP.md`
4. Submit a pull request

### Adding Blog Content

1. See `BLOG_POST_SOP.md` for content guidelines
2. Create posts in `astro-template/src/data/blog/`
3. Use the established naming convention: `YYYY-MM-DD-title.md`

## 📈 Analytics & Performance

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized for speed and user experience
- **SEO**: Structured data and meta optimization
- **Accessibility**: WCAG compliant components

## 🔧 Configuration

Customize the directory in `astro-template/src/config/settings.toml`:
- **Themes**: Choose from 4 pre-built themes
- **Tags**: Modify category and user type tags
- **Navigation**: Update header and footer links
- **SEO**: Configure meta tags and social sharing

## 📄 License

[MIT License](./astro-template/LICENSE)

## 🙋‍♂️ Support

For questions or support, please:
1. Check the [documentation](./astro-template/README.md)
2. Review existing [issues](https://github.com/matthewhalliard/mediaplanningtool/issues)
3. Create a new issue if needed

---

**Built with ❤️ for the media planning community** 