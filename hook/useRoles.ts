import { fetcher } from "@/lib/utils"
import useSWR from "swr"

export function useRoles () {
    const { data, error, isLoading } = useSWR(`/api/roles`, fetcher)
    return {
      roles: data,
      isLoading,
      isError: error
    }
  }