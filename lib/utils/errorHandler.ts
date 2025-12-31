import { Prisma } from "@prisma/client";

export function handlePrismaError(error: any) {
  console.error("Prisma Error:", error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          message: `Duplicate field value: ${error.meta?.target}`,
          statusCode: 409,
        };
      case "P2025":
        return {
          message: "Record not found",
          statusCode: 404,
        };
      case "P2003":
        return {
          message: "Foreign key constraint failed",
          statusCode: 400,
        };
      default:
        return {
          message: "Database error occurred",
          statusCode: 400,
        };
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      message: "Validation error",
      statusCode: 400,
    };
  }

  return {
    message: error.message || "Internal server error",
    statusCode: 500,
  };
}
