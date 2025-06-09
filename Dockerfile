# Multi-stage build for optimized image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Production stage
FROM node:18-alpine AS production

# Add metadata
LABEL maintainer="ArgoCD Demo"
LABEL description="Demo application for ArgoCD GitOps"

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copy dependencies and app code
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV APP_VERSION=1.0.0

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Switch to app user
USER nextjs

# Start the application
CMD ["npm", "start"]
