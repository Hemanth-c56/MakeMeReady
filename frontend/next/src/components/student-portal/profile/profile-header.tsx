'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import { AlertCircle, Github, Linkedin, Settings, Upload } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/shared/shadcn/dialog';
import { Input } from '~/shared/shadcn/input';
import { Label } from '~/shared/shadcn/label';

import type React from 'react';

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [openSettings, setOpenSettings] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <Dialog open={openSettings} onOpenChange={setOpenSettings}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full bg-transparent">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Account Settings</DialogTitle>
              <DialogDescription>Manage your account security and preferences</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3 border-b pb-6">
                <h3 className="text-foreground font-semibold">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="current-pwd" className="text-sm">
                      Current Password
                    </Label>
                    <Input
                      id="current-pwd"
                      type="password"
                      placeholder="Enter current password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-pwd" className="text-sm">
                      New Password
                    </Label>
                    <Input
                      id="new-pwd"
                      type="password"
                      placeholder="Enter new password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-pwd" className="text-sm">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-pwd"
                      type="password"
                      placeholder="Confirm new password"
                      className="mt-1"
                    />
                  </div>
                  <Button className="mt-2 w-full">Update Password</Button>
                </div>
              </div>

              <div className="text-destructive space-y-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Delete Account</h3>
                    <p className="text-destructive/70 mt-1 text-sm">
                      Permanently delete your account and all associated data. This action cannot be
                      undone.
                    </p>
                    <Button variant="destructive" className="mt-3">
                      Delete My Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-6">
        <div className="group relative">
          <div
            onClick={triggerFileInput}
            className="from-primary to-primary/60 flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-linear-to-br text-2xl font-bold text-white">
            {profileImage ? (
              <Image
                src={profileImage || '/placeholder.svg'}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              user.avatar
            )}
          </div>
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Upload className="h-5 w-5 text-white" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileImageUpload}
            className="hidden"
            aria-label="Upload profile picture"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-foreground text-4xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
