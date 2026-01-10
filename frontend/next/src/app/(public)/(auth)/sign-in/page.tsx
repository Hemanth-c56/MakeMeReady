'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CheckCircle2, Eye, EyeOff } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import { Card, CardContent, CardTitle } from '~/shared/shadcn/card';
import { Input } from '~/shared/shadcn/input';

function page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div>
        <Card>
          <CardTitle className="flex flex-col items-center gap-3">
            <div className="text-primary flex items-center gap-2 text-3xl font-bold tracking-tight">
              <div className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-lg">
                <CheckCircle2 size={20} />
              </div>
              MakeMeReady.
            </div>
            <span className="text-2xl">Sign-in</span>
          </CardTitle>
          <CardContent>
            <div>
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push('/student-portal/12345/dashboard');
                }}>
                <Input
                  className="h-10 text-lg! placeholder:text-lg"
                  type="email"
                  placeholder="Enter your email"
                />
                <div className="relative">
                  <Input
                    className="h-10 text-lg! placeholder:text-lg"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2">
                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                  </button>
                </div>

                <Link className="text-sm text-blue-950" href="/forgot-password">
                  Forgot Password ?
                </Link>
                <Button className="text-lg" type="submit">
                  Sign-in
                </Button>
                <Link className="text-right text-sm text-blue-950" href="/sign-up">
                  New to MakeMeReady ?
                </Link>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default page;
