export function isReviewMode(environment:Record<string,string|undefined>=process.env):boolean {return environment.VERCEL_ENV==='preview'||environment.NEXT_PUBLIC_REVIEW_MODE==='true';}
