/* eslint-disable @typescript-eslint/no-unused-vars */
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export { GET, POST };

async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const getProfile = await prisma.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!getProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "GET PROFILE", data: getProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function POST(req: Request) {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const createProfile = await prisma.profile.create({
      data: {
        name: body?.name,
        bio: body?.bio,
        avatarUrl: body?.avatarUrl,
        userId: session.user.id,
      },
    });

    if (!createProfile) {
      return NextResponse.json(
        { error: "Failed to create profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "CREATE PROFILE", createProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
