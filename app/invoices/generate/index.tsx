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
import { useStore } from '~/store/store'
import { BusinessEntity, buisnessEntitySchema } from '~/app/schema/invoice'






export default function GenerateInvoice() {
    const addSenderInfo = useStore(data => data.addSenderInfo)

    const form = useForm<BusinessEntity>({
        resolver: zodResolver(buisnessEntitySchema),
        defaultValues: {
            name: 'Vlados',
            address: 'Saint-Petersburg',
            taxId: '1344357434'

        }
    })

    const onSubmit = (data: any) => {
        addSenderInfo(data)
        router.push('/invoices/generate/recipient')

    }
    return (
        <KeyboardAwareScrollView>
            <FormProvider {...form}>
                <Text className='mb-5 text-2xl font-bold'>Sender Info</Text>

                <View className='gap-3'>
                    <CustomTextInput name="name" label="Name" />
                    <CustomTextInput name="address" label="Address" multiline />
                    <CustomTextInput name="taxId" label="Tax ID" />
                </View>
                <Button title="Next" className="mt-auto pt-5" onPress={form.handleSubmit(onSubmit)} />
            </FormProvider>
        </KeyboardAwareScrollView>
    )
}