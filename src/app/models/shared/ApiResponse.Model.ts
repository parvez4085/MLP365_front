export interface ApiResponse<T> {
  data: T;            // The actual data
  success: boolean;          // Whether the request was successful
  message: string;          // Optional message or status text
  statusCode: number | string;    // Optional status or error code
  error: string[];         // Optional list of error messages
}