# Tevin Medley Website - Project Summary

This document provides a comprehensive overview of the personal website project, documenting the structure, functionality, and design patterns to help resume development efficiently.

## Project Overview

This is a personal website for Tevin Medley, an organizational transformation strategist and community network builder. The site features a modern, responsive design with an earth tone color palette inspired by the Pacific Northwest. The site includes several key sections to showcase Tevin's work, interests, and services.

## Site Structure

The website consists of the following main pages:

- **Home (`index.html`)**: Main landing page with hero section, featured content, and call-to-action areas
- **About (`about.html`)**: Personal background and professional information
- **Projects (`projects.html`)**: Portfolio of professional work and projects
- **Black-owned (`black-owned.html`)**: Directory of Black-owned and focused organizations in Washington State
- **Blog (`blog.html`)**: Articles and news related to AI, strategy, community, leadership, and equity
- **Swag (`swag.html`)**: Merchandise section
- **Learn (`learn.html`)**: Educational resources and offerings
- **Connect (`connect.html`)**: Contact information and form

## File Structure

### HTML Files
- `index.html`: Main landing page
- `about.html`: About page
- `projects.html`: Projects and portfolio
- `black-owned.html`: Black-owned businesses directory
- `blog.html`: Blog and news articles
- `swag.html`: Merchandise page
- `learn.html`: Educational resources
- `connect.html`: Contact page and form

### CSS Files
- `css/styles.css`: Main stylesheet with core styling
  - Defines color variables, typography, layout, responsive design
  - Implements the earth tone color palette
  - Contains styles for navigation, buttons, cards, forms, and more
- `css/enhancements.css`: Additional CSS for advanced features
  - Adds microinteractions and animations
  - Implements mega menu styling
  - Provides immersive hero section effects
  - Adds gold accent colors and visual enhancements

### JavaScript Files
- `js/script.js`: Core functionality
  - Mobile navigation toggle
  - Newsletter subscription form handling
  - Smooth scrolling for anchor links
  - Header scroll effects
  - Active menu item highlighting
- `js/enhancements.js`: Advanced interactive features
  - Parallax effects for hero section
  - Scroll animations for elements
  - Recently viewed items tracking (using localStorage)
  - Time-based personalized greetings
  - Button click animations with ripple effect
  - FAQ accordion functionality

### Assets
- `img/`: Contains all image assets organized in subdirectories:
  - `img/about/`: Profile images
  - `img/black-owned/`: Images for the Black-owned businesses section
  - `img/blog/`: Blog post images
  - `img/hero/`: Hero section background images
  - `img/learn/`: Images for the learning resources section
  - `img/projects/`: Project showcase images
  - `img/swag/`: Product images for merchandise

## Design Elements

### Color Palette
- **Primary Colors**: Earth tones inspired by the Pacific Northwest
  - Forest green (`#2c5f2d`)
  - Moss green (`#97bc62`)
  - Bark brown (`#5e503f`)
  - Earth brown (`#a98467`)
  - Sand/beige (`#dcc7aa`)
  - Stone gray (`#6d6875`)
  - Fog green-gray (`#c9cba3`)
  - Water blue (`#3a7d8c`)
  - Sky blue (`#83a2b4`)
- **Accent Colors**:
  - Gold (`#d4af37`)
  - Gold light (`#f8e9a1`)
  - Gold dark (`#b38728`)
  - Black accent (`#111111`)

### Typography
- **Headings**: Montserrat (sans-serif)
- **Body**: Open Sans (sans-serif)

### UI Components
- **Navigation**: 
  - Sticky header with dropdown mega menus
  - Mobile-responsive hamburger menu
  - Active state indicators
- **Cards**:
  - Featured cards with hover effects
  - Blog post cards with category badges
  - Project showcase cards
- **Buttons**:
  - Primary buttons (filled with hover state)
  - Secondary buttons (outlined with hover state)
  - Text buttons with arrow icons
  - Ripple effect on click
- **Sections**:
  - Immersive hero with parallax effect
  - Newsletter subscription
  - Call-to-action banners
  - Recently viewed items
- **Footer**:
  - Multi-column layout with navigation, contact, and social links

## JavaScript Functionality

### Core Features
- **Responsive Navigation**:
  - Mobile menu toggle
  - Outside click detection to close menu
  - Header appearance changes on scroll
- **User Experience**:
  - Smooth scrolling for anchor links
  - Newsletter form validation and submission

### Enhanced Features
- **Visual Effects**:
  - Parallax scrolling for hero background
  - Fade-in animations for elements as they enter viewport
  - Staggered animations for grid items
- **Interactivity**:
  - Personalized time-based greetings
  - Recently viewed items tracking using localStorage
  - Button click animations with ripple effect
- **Mobile Optimizations**:
  - Mega menu adaptations for mobile devices
  - Touch-friendly accordions for FAQs

## Future Development Areas

### Potential Enhancements
- **Content Management**: Implement a CMS for easier content updates
- **Dynamic Blog**: Develop full blog functionality with comments
- **E-commerce**: Expand the Swag section with shopping cart functionality
- **Authentication**: Add user accounts for personalized experiences
- **Search Functionality**: Implement site-wide search

### Performance Optimizations
- Image optimization and lazy loading
- Code splitting for faster page loads
- Service worker for offline capabilities

## Current Open Files

These files were open in the editor when this summary was created, indicating they were likely being actively worked on:

- `css/styles.css`: Main stylesheet
- `js/script.js`: Core JavaScript functionality
- `css/enhancements.css`: Enhanced styling
- `js/enhancements.js`: Enhanced JavaScript functionality
- `index.html`: Homepage
- `about.html`: About page
- `projects.html`: Projects page
- `black-owned.html`: Black-owned businesses directory
- `blog.html`: Blog page
- `swag.html`: Merchandise page
- `learn.html`: Learning resources page
- `connect.html`: Contact page

## Design Patterns Used

1. **Component-Based Design**: UI elements are designed as reusable components
2. **Mobile-First Responsive Design**: Site adapts smoothly to different screen sizes
3. **Progressive Enhancement**: Core functionality works without JS, enhanced with it
4. **Microinteractions**: Subtle animations improve user experience
5. **Mega Menu Pattern**: For complex navigation hierarchies
6. **Card-Based Layout**: For displaying collections of similar content

This summary document should help quickly resume development work on this project by providing a comprehensive overview of its structure, functionality, and design patterns.
