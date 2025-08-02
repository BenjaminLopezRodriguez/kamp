"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";
import {
  LogoutLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Badge } from "lucide-react";

interface Plan {
  key: string;
}

interface EntitlementsData {
  data?: {
    plans?: Plan[];
  };
}

export default function AuthButtons() {
  const { isAuthenticated, getUser, getPermission, getOrganization } =
    useKindeAuth();
  const user = getUser();

  const [entitlementsData, setEntitlementsData] =
    useState<EntitlementsData | null>(null);

  useEffect(() => {
    const fetchEntitlements = async () => {
      if (isAuthenticated && user) {
        try {
          const res = await fetch("/api/billing", {
           
            cache: "no-store",
          });
          console.log("WORKING")
          if (res.ok) {
            const data = await res.json();
            setEntitlementsData(data);
            console.log(entitlementsData?.data)
          }
        } catch (error) {
          console.error("Error fetching entitlements:", error);
        }
      }
    };

    fetchEntitlements();
  }, [isAuthenticated, user]);

  console.log(entitlementsData)

  const hasEntitlement = (entitlementKey: string): boolean => {
    if (!entitlementsData?.data?.plans) return false;
    return entitlementsData.data.plans.some(
      (plan: Plan) => plan.key === entitlementKey
    );
  };


  const checkAccountType = () => {
     console.log(entitlementsData?.data?.plans)
    // const org = getOrganization();
    // const isAdmin = getPermission("free")?.isGranted ?? false;
    // const isMember = getPermission("member")?.isGranted ?? false;

//     alert(`Account Type:
// Organization: ${
//       typeof org === "object" && "orgName" in org ? org.orgName : "None"
//     }
// Admin: ${isAdmin ? "Yes" : "No"}
// Member: ${isMember ? "Yes" : "No"}
// Email: ${user?.email || "Unknown"}`);
  };

  if (isAuthenticated) {
    return (
      <Button
        asChild
        variant="outline"
        className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
      >
        <LoginLink>Sign In</LoginLink>
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
        <Badge>
            {hasEntitlement("basic")
            ? "basic"
        : null}
        </Badge>
      <Button
        variant="outline"
        onClick={checkAccountType}
        className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
      >
        Check Account Type
      </Button>
      <Button
        asChild
        variant="outline"
        className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
      >
        <LogoutLink>Sign Out</LogoutLink>
      </Button>
    </div>
  );
}


export function ClientWrapper() {
    return <AuthButtons />;
  }