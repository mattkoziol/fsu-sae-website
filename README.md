# Sigma Alpha Epsilon – Florida State University (FSU SAE) Web Platform

This is the official web platform for the Florida Beta Chapter of Sigma Alpha Epsilon at Florida State University. The site is a full-stack, cloud-native application designed to serve active members, alumni, and the broader FSU community.

---

## Project Overview
This platform provides a secure, modern, and mobile-friendly experience for:
- Member directory
- Event highlights and philanthropy
- Newsletter subscriptions
- Account management and profile customization
- Alumni engagement and RSVP
- Chapter branding and outreach

---

## Tech Stack

### Frontend
- **React** (with React Router)
- **Bootstrap 5** (CDN)
- **Font Awesome** (CDN)
- **Custom CSS** for FSU SAE branding and responsive design
- **Axios** and Fetch API for HTTP requests
- **LocalStorage** for JWT and user info

### Backend
- **Node.js** (v18+)
- **Express.js**
- **AWS SDK v2 & v3** (Cognito, S3, DynamoDB)
- **jsonwebtoken** for JWT verification
- **CORS** for secure cross-origin requests
- **Multer & multer-s3** for file uploads
- **dotenv** for environment configuration

### AWS & Cloud Services
- **Amazon Cognito**: User authentication, custom attributes (role, invite code), JWT issuance
- **Amazon DynamoDB**: Member directory, alumni RSVP, newsletter subscribers
- **Amazon S3**: Profile picture storage and serving
- **Elastic Beanstalk**: Backend deployment (with environment config)
- **CloudFront/S3 Static Hosting**: Frontend deployment

---

## Key Features

### Authentication & Security
- AWS Cognito user pool with custom attributes (`role`, `inviteCode`)
- Secure signup (with invite code), login, and email verification
- JWT-based authentication; tokens verified against Cognito public keys
- Protected API routes (middleware checks JWT validity)
- Role-based access (active member, alumni)
- No passwords stored in the database (Cognito handles auth)

### Member Directory
- Member directory (DynamoDB-backed)
- Profile management: name, email, profile picture (S3), LinkedIn, major, graduation year
- Executive board listing

### Alumni Engagement
- Alumni RSVP for events (DynamoDB-backed)
- Alumni-specific content and account settings

### Newsletter
- Newsletter subscription form (with email validation and duplicate prevention)
- Subscriber list stored in DynamoDB
- Latest newsletter preview and modal image carousel

### Events & Philanthropy
- Rush events section with dynamic content
- Philanthropy highlights (e.g., Paddy Murphy Week, Panhellenic competitions)
- PanelCarousel for showcasing chapter participation in campus events

### UI/UX & Branding
- Custom color palette: Royal Purple & Old Gold
- Modern, mobile-responsive layout
- Animated section headers, hero banners, and button effects
- Consistent footer and navigation across all pages
- Social media integration (Instagram, Facebook, LinkedIn)
- Accessibility and smooth scrolling enhancements

### General
- CORS and network configuration for local and production environments
- Environment-based API URLs (frontend and backend)
- Robust error handling and user feedback
- No sensitive credentials or setup instructions exposed in the codebase

---

## Note
This repository is for the official FSU SAE website. It is not intended for public reuse or deployment by others. All rights reserved.
