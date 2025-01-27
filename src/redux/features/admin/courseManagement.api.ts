/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TQueryParam,
  TRegisteredSemester,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TRegisteredSemester[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["SemesterReg" as any],
    }),

    // Add semester registration with cache invalidation
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SemesterReg" as any],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetRegisteredSemesterQuery,
} = courseManagementApi;
