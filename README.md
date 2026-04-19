# Falsenine Server - Deployment Guide

This guide explains how to deploy the Falsenine Express API to AWS Lambda using the [Serverless Framework](https://www.serverless.com/).

## Prerequisites

1. **Node.js**: Make sure you have Node.js installed (v22+ recommended as per `serverless.yml`).
2. **AWS Account & CLI**: You need an active AWS account. Install the [AWS CLI](https://aws.amazon.com/cli/) and configure it with your credentials:
   ```bash
   aws configure
   ```
   _(Ensure the IAM user has sufficient permissions for Serverless deployments: CloudFormation, Lambda, API Gateway, DynamoDB, IAM, etc.)_

## 1. Install Dependencies

First, install all required dependencies for the project:

```bash
npm install
```

_(This will also install the required Serverless Framework and plugins locally)._

## 2. Set Environment Variables

The `serverless.yml` expects certain environment variables to be present during deployment and runtime. You can provide these either by exporting them in your shell before deploying or by using a `.env` file (if supported in your Serverless setup).

Ensure you have the following variables ready:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `COOKIE_DOMAIN`
- `JWT_SECRET`
- `NODE_ENV`

```bash
export RAZORPAY_KEY_ID="your_key_id"
export RAZORPAY_KEY_SECRET="your_key_secret"
export JWT_SECRET="your_jwt_secret"
# ... set any others needed
```

## 3. Build the Application

Since the project is written in TypeScript, you must compile it into JavaScript before deploying. The `serverless.yml` is configured to package the `dist/` directory.

```bash
npm run build
```

_(This will run `tsc` and generate the compiled files in the `dist` folder)._

## 4. Setup Custom Domain (First Time Only)

This project uses the `serverless-domain-manager` plugin to map the API to `api.falseninejersey.shop`. Since `createRoute53Record` is set to `false` (because DNS is on GoDaddy), you need to ensure the custom domain is created in AWS API Gateway.

Run this command **only once** to create the domain name in API Gateway:

```bash
npx serverless create_domain
```

After the domain is created, you will need to log into GoDaddy and create a **CNAME** record pointing `api.falseninejersey.shop` to the API Gateway domain name provided by AWS.

## 5. Deploy to AWS

With the code built and environment variables set, deploy the service:

```bash
npx serverless deploy
```

or deploy to a specific stage (default is `prod`):

```bash
npx serverless deploy --stage prod
```

### What this does:

1. Packages the `dist/` folder and `node_modules`.
2. Uploads the artifact to AWS S3.
3. Creates/Updates a CloudFormation stack.
4. Provisions an HTTP API (API Gateway v2) and an AWS Lambda function.
5. Updates IAM roles to grant access to the DynamoDB tables (`EcommerceData` and `contact`).
6. Maps the custom domain to the deployed HTTP API.

## Useful Serverless Commands

- **View Deployment Info**: `npx serverless info`
- **Tail Logs**: `npx serverless logs -f api -t`
- **Remove Deployment**: `npx serverless remove` _(Warning: This will delete the API and Lambda function from AWS!)_
