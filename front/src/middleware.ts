import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Gestion du CORS pour toutes les routes API
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Récupérer la réponse
    const response = NextResponse.next();

    // Ajouter les headers CORS
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  }

  return NextResponse.next();
}

// Uniquement activer le middleware pour les routes API
export const config = {
  matcher: "/api/:path*",
};
