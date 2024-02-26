'use client'

import React from 'react'
import Loader from '@/components/UI/Loader/Loader'
import Button from '@/components/UI/Buttons/Button/Button'
import FormInput from '@/components/UI/FormInput/FormInput'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiForgotPassword } from '@/services/authService'
import { useErrorHandler } from '@/services/apiError/apiError'

export default function ForgotPassForm() {
  const [loading, setLoading] = useState(false)
  const { errorMessage, handleError } = useErrorHandler()
  const { handleSubmit, register, getValues, reset } = useForm()
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

  const onSubmit = async () => {
    const { email } = getValues() as { email: string }

    try {
      setLoading(true)
      await apiForgotPassword({ email })
      setEmailSent(true)
      localStorage.setItem('emailForReset', email)
      reset()
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }
  const handleChangeClick = () => {
    router.push('/resetpass')
  }

  return (
    <div className="mx-auto mt-4 flex  max-w-screen-md items-center justify-center px-4">
      {emailSent ? (
        <div>
          <h2 className="mb-4 pt-6 text-4xl font-medium text-slate-950">
            Email is on the way!
          </h2>
          <div>
            <p className="mb-10 text-lg font-medium text-slate-950">
              We sent you password reset instructions. If it doesn`t show up
              soon, check your spam folder. We sent it from the email address
              youricedlatteshop@gmail.com
            </p>
            <Button
              className="mt-6 flex items-center justify-center hover:bg-brand-solid-hover"
              onClick={handleChangeClick}>Continue to chnage your password</Button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-4 pt-6 text-4xl font-medium text-slate-950">
            Forgot password?
          </h2>
          <p className="mb-8 text-lg font-medium text-slate-950">
            All good. Enter your account`s email address and we`ll send you a code to reset your password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <div className="mt-4 text-negative">
                {errorMessage}
              </div>
            )}
            <FormInput
              id="email"
              register={register}
              name="email"
              label="Enter your email"
              type="email"
              placeholder="Enter your email address"
              className="mb-5"
            />
            <Button type="submit" className="px-6">
              {loading ? <Loader /> : 'Send reset link'}
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}


