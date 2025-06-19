"use client";

import React from "react";
import { Authenticated, AuthLoading } from "convex/react";
import LoadingLogo from "@/components/shared/LoadingLogo";

export default function ConvexAuthGate({children}: {children: React.ReactNode;})
{
  return (
    <>
      <Authenticated>{children}</Authenticated>
      <AuthLoading>
        <LoadingLogo />
      </AuthLoading>
    </>
  );
}
