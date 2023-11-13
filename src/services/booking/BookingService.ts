import axios from "axios";
import {API_URL, TOKEN} from "@/services/ApiService";
import {BookingType, EmployeeBookingsType} from "@/types/bookingType";
import moment from "moment";

export async function getBookings(): Promise<BookingType[]> {
    const response = await axios.get(API_URL + "/appointment", {headers: {'Authorization': 'Bearer ' + TOKEN}});
    if (response?.data?.success) {
        // @ts-ignore
        return response?.data?.appointments?.map(appointment => {
            return {
                ID: appointment?._id,
                start: new Date(appointment?.start),
                end: new Date(appointment?.end),
                customer: {
                    ID: appointment?.customer?._id,
                    firstName: appointment?.customer?.firstName,
                    lastName: appointment?.customer?.lastName,
                    phoneNumber: appointment?.customer?.phoneNumber,
                },
                employee: {
                    ID: appointment?.employee?._id,
                    email: appointment?.employee?.email,
                    firstName: appointment?.employee?.firstName,
                    lastName: appointment?.employee?.lastName,
                    phoneNumber: appointment?.employee?.phoneNumber,
                },
                type: {
                    name: appointment?.type?.name,
                }
            }
        })
    }
    return []
}


export async function getEmployeeBookings(date: string): Promise<EmployeeBookingsType[]> {
    const endDate = moment(date).add(1, 'days').format('YYYY-MM-DD') + 'T00:00:00.000Z';

    const response = await axios.get(API_URL + `/appointment/employees?startDate=${date}&endDate=${endDate}`, {headers: {'Authorization': 'Bearer ' + TOKEN}});
    if (response?.data?.success) {
        // @ts-ignore
        return response?.data?.employees?.map(employeeBooking => {
            // @ts-ignore
            const bookings = employeeBooking?.appointments.map(appointment => {
                appointment.start = new Date(appointment.start)
                appointment.end = new Date(appointment.end)
                return appointment;
            })
            return {
                employee: employeeBooking?.employee,
                bookings: bookings,
            }
        });
    }
    return [];
}
