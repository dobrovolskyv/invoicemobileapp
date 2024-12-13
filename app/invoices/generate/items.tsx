import { View, Text, TextInput, ScrollView, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '~/components/Button'
import CustomTextInput from '~/components/CustomTextInput'
import KeyboardAwareScrollView from '~/components/KeyboardAwareScrollView'

import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from 'expo-router'
import { InvoiceitemSchema } from '~/app/schema/invoice'
import { useStore } from '~/store/store'


const itemSchema = z.object({
    items:  InvoiceitemSchema.array()
})

type Items = z.infer<typeof itemSchema>


export default function GenerateInvoice() {
    const addItems= useStore(data=>data.addItems)

    const form = useForm<Items>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            items: [{
                name: 'Example Item',
                quantity: 1,
                price: 30,

            }]
        }
    })

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "items"
    })

    const onSubmit = (data: any) => {
        addItems(data.items)
        router.push('/invoices/generate/summary')

    }
    return (
        <KeyboardAwareScrollView>
            <FormProvider {...form}>

                <View className='gap-3 '>
                    {fields.map((_, index) => (
                        <View key={index} className='gap-3 rounded-lg bg-gray-50 shadow p-4 '>
                            <Text className='text-lg font-semibold'> Item {index + 1}</Text>
                            <CustomTextInput name={`items.${index}.name`} label="Name" />

                            <View className='flex-row gap-3 w-full'>
                                <View className='flex-1'>
                                    <CustomTextInput name={`items.${index}.quantity`} label="Quantity" keyboardType='numeric'
                                        onChangeText={(value) => form.setValue(`items.${index}.quantity`, Number(value))} />
                                </View>
                                <View className='flex-1'>
                                    <CustomTextInput name={`items.${index}.price`} label="Price" keyboardType='numeric'
                                        onChangeText={(value) => form.setValue(`items.${index}.price`, Number(value))}
                                    />
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-lg font-bold'>Total</Text>
                                    <Text className='mt-4 text-lg font-bold'>
                                        ${
                                            (form.watch(`items.${index}.quantity`) || 0) *
                                            (form.watch(`items.${index}.price`) || 0)
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <Button title="Add Item" variant='link' className='mt-3' onPress={() => append({ name: '', quantity: 0, price: 0 })} />


                <Button title="Next" className="mt-auto pt-5" onPress={form.handleSubmit(onSubmit)} />
            </FormProvider>
        </KeyboardAwareScrollView>
    )
}