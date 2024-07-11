import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Tables } from "../types";


export type passenger = {
  full_name: string,
  email: string | null,
  phone_number: string | null
}

type BookingContextTypes = {
  schedule: Tables<'schedules'> | null,
  setSchedule: (schedule: Tables<'schedules'>) => void,
  passenger: passenger | null,
  setPassenger: (passenger: passenger) => void,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
  paymentMethod: string,
  setPaymentMethod: (method: string) => void
}

const BookingContext = createContext<BookingContextTypes>({
  schedule: null,
  setSchedule: (schedule: Tables<'schedules'>) => {},
  passenger: null,
  setPassenger:  (passenger: passenger) => {},
  isLoading: true,
  setIsLoading: (loading: boolean) => {},
  paymentMethod: '',
  setPaymentMethod: (method: string) => {}
})


function BookingProvider({ children } : PropsWithChildren) {
  const [schedule, setSchedule] = useState<Tables<'schedules'>|null>(null)
  const [passenger, setPassenger] = useState<passenger|null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('')

  return (
    <BookingContext.Provider value={
      {schedule, setSchedule, passenger, setPassenger, isLoading, setIsLoading,
        paymentMethod, setPaymentMethod
      }
    }>
      {children}
    </BookingContext.Provider>
  )
}

export default BookingProvider;
export const useBooking = () => useContext(BookingContext)