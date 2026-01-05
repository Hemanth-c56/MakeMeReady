'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { CheckCircle2, Eye, EyeOff } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import { Card, CardContent, CardTitle } from '~/shared/shadcn/card';
import { Input } from '~/shared/shadcn/input';

function page() {
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
            <span className="text-2xl">Register</span>
          </CardTitle>
          <CardContent>
            <div>
              <form className="flex flex-col gap-5">
                <Input
                  className="h-10 text-lg! placeholder:text-lg"
                  type="text"
                  placeholder="Enter your Full Name"
                />
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
                <div className="relative">
                  <Input
                    className="h-10 text-lg! placeholder:text-lg"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2">
                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                  </button>
                </div>
                <Button className="text-lg" type="submit">
                  Register
                </Button>
                <Link className="text-right text-sm text-blue-950" href="/sign-in">
                  Sign - In ?
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
