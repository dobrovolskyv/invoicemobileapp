import { View, Text, TextInput, ScrollView, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '~/components/Button'
import CustomTextInput from '~/components/CustomTextInput'
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView'

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from 'expo-router'
import { InvoiceInfo, InvoiceInfoSchema } from '~/app/schema/invoice'
import { useStore } from '~/store/store'






export default function GenerateInvoice() {
    const addInvoiceInfo = useStore(data=>data.addInvoiceInfo)
     
    const form = useForm<InvoiceInfo>({
        resolver: zodResolver(InvoiceInfoSchema),
        defaultValues:{
            invoiceNumber: '2134324565',
            date: new Date().toISOString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),

        }
    })

    const onSubmit = (data: any) => {
        addInvoiceInfo(data)
        router.push('/invoices/generate/items')

    }
    return (
        <KeyboardAwareScrollView>
            <FormProvider {...form}>
                <Text className='mb-5 text-2xl font-bold'>Invoice Info</Text>

                <View className='gap-3'>
                   <CustomTextInput name="invoiceNumber" label="Invoice Number" />
                   <CustomTextInput name="date" label="Date" />
                   <CustomTextInput name="dueDate" label="Due Date" />
                </View>
                <Button title="Next" className="mt-auto pt-5" onPress={form.handleSubmit(onSubmit)} />
            </FormProvider>
        </KeyboardAwareScrollView>
    )
}