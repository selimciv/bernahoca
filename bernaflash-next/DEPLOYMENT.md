# BernaFlash Next.js - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Fastest)
```bash
cd bernaflash-next
npx vercel
```
Follow prompts, deployment complete in ~2 minutes!

### Option 2: GitHub + Vercel Dashboard
1. Create GitHub repo
2. Push bernaflash-next folder
3. Go to vercel.com
4. Import repository
5. Deploy!

## Environment Variables (Optional)

For production, move Firebase config to env vars:

Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBmUhP2LdVReR9gRDX5el0lpUfgqE7Jt6A
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bernavocab.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://bernavocab-default-rtdb.europe-west1.firebasedatabase.app
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bernavocab
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bernavocab.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=234781292902
NEXT_PUBLIC_FIREBASE_APP_ID=1:234781292902:web:617492bb14db69363cf0a7
```

Update `lib/firebase.ts` to use process.env:
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // etc...
};
```

## Build Test

Before deploying, test the build:
```bash
npm run build
npm run start
```

If build succeeds, deployment will work!

## Custom Domain

After deployment:
1. Vercel Dashboard → Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL automatically configured

## Performance Tips

- ✅ Images already optimized (Next.js Image component)
- ✅ Code splitting automatic (Next.js)
- ✅ CDN distribution (Vercel Edge Network)
- � Firebase indexes may be needed for homework queries

That's it! 🎉
