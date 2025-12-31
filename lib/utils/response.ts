import { NextResponse } from "next/server";

export class ApiResponse {
  static success(data: any, message = "Success", statusCode = 200) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status: statusCode }
    );
  }

  static error(message: string, statusCode = 400, errors?: any) {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      { status: statusCode }
    );
  }
}
