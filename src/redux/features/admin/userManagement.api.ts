/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TAdmin,
  TFaculty,
  TQueryParam,
  TResponseRedux,
  TStudent,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // student
    getStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["Student" as any],
    }),

    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student" as any],
    }),

    getSingleStudent: builder.query({
      query: (studentId: string) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TStudent>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["Student" as any],
    }),

    updateStudent: builder.mutation({
      query: (data) => ({
        url: `/students/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Student" as any],
    }),

    // faculty
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faculty" as any],
    }),

    getFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["Faculty" as any],
    }),

    getSingleFaculty: builder.query({
      query: (facultyId: string) => ({
        url: `/faculties/${facultyId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TFaculty>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["Faculty" as any],
    }),

    updateFaculty: builder.mutation({
      query: (data) => ({
        url: `/faculties/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Faculty" as any],
    }),

    // faculty
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin" as any],
    }),

    getAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["Admin" as any],
    }),

    getSingleAdmin: builder.query({
      query: (adminId: string) => ({
        url: `/admins/${adminId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAdmin>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["Admin" as any],
    }),

    updateAdmin: builder.mutation({
      query: (data) => ({
        url: `/admins/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Admin" as any],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useAddFacultyMutation,
  useGetFacultyQuery,
  useGetSingleFacultyQuery,
  useUpdateFacultyMutation,
  useAddAdminMutation,
  useGetAdminQuery,
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} = userManagementApi;
