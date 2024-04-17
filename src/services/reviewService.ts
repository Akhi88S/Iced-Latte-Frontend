import { Review } from '@/types/ProductReviewType'
import { api } from './apiConfig/apiConfig'
import { AxiosResponse } from 'axios'

export interface ReviewsResponse {
  reviewsWithRatings: Review[]
}
export interface SubmittedReviewInfo {
  productReviewId: string
  text: string
  createdAt: string
}

export interface RatingResponse {
  productId: string
  avgRating: number
  reviewCount: number
  ratingMap: {
    [key: number]: number
  }
}

export async function apiGetProductReviews(
  productId: string,
): Promise<ReviewsResponse> {
  const response: AxiosResponse<ReviewsResponse> = await api.get(
    `/products/${productId}/reviews`,
  )

  return response.data
}

export async function apiAddProductReview(
  productId: string,
  reviewText: string,
  currentRating: number,
): Promise<SubmittedReviewInfo> {
  const response: AxiosResponse<SubmittedReviewInfo> = await api.post(
    `/products/${productId}/reviews`,
    {
      text: reviewText,
      rating: currentRating,
    },
  )

  return response.data
}

export async function apiDeleteProductReview(
  productReviewId: string,
  productId: string,
): Promise<void> {
  await api.delete(`/products/${productId}/reviews/${productReviewId}`)
}

export async function apiGetProductUserReview(
  productId: string,
): Promise<Review> {
  const response: AxiosResponse<Review> = await api.get(
    `/products/${productId}/review`,
  )

  return response.data
}

export async function apiGetProductRating(
  productId: string,
): Promise<RatingResponse> {
  const response: AxiosResponse<RatingResponse> = await api.get(
    `/products/${productId}/reviews/statistics`,
  )

  return response.data
}
