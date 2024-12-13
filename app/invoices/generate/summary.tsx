import { View, Text } from "react-native";
import { Button } from "~/components/Button";
import KeyboardAwareScrollView from "~/components/KeyboardAwareScrollView";
import { useStore } from "~/store/store";

export default function InvoiceSummary() {
    const newInvoice = useStore((data) => data.newInvoice);

    return (
        <KeyboardAwareScrollView>
            <View className="shadow gap-4">
                <View className="rounded-lg bg-gray-50 shadow-xs p-4">
                    <Text className="text-lg font-semibold mb-2">
                        Sender Invoice
                    </Text>
                    <View className="gap-1">
                        <Text>{newInvoice.sender?.name}</Text>
                        <Text>{newInvoice.sender?.address}</Text>
                        <Text>{newInvoice.sender?.taxId}</Text>
                    </View>
                </View>

                {/* Recipient Info Card */}
                <View className="rounded-lg bg-gray-50 p-4">
                    <Text className="mb-2 text-lg font-semibold">Recipien invocicer</Text>
                    <View className="gap-1">
                        <Text>{newInvoice.recipient?.name}</Text>
                        <Text>{newInvoice.recipient?.address}</Text>
                        <Text>{newInvoice.recipient?.taxId}</Text>
                    </View>
                </View>

                {/* Invoice Details Card */}
                <View className="rounded-lg bg-gray-50 p-4">
                    <Text className="mb-2 text-lg font-semibold">Invoce details card</Text>
                    <View className="gap-1">
                        <Text>Invoice #: {newInvoice.invoiceNumber}</Text>
                        <Text>Date: {newInvoice.date}</Text>
                        <Text>Due Date: {newInvoice.dueDate}</Text>
                    </View>
                </View>

                {/* Items card */}
                <View className="rounded-lg bg-gray-50 p-4">
                    <Text className="mb-2 text-lg font-semibold">Items card</Text>
                    <View className="gap-3">
                        <View className="flex-row justify-between">
                            <Text className="flex-1 font-medium">Item</Text>
                            <Text className="w-20 text-right font-medium">Qty</Text>
                            <Text className="w-20 text-right font-medium">Price</Text>
                            <Text className="w-20 text-right font-medium">Total</Text>
                        </View>

                        {newInvoice.items?.map((item) => (
                            <View key={item.name} className="flex-row justify-between">
                                <Text className="flex-1">{item.name}</Text>
                                <Text className="w-20 text-right">{item.quantity}</Text>
                                <Text className="w-20 text-right">{item.price}</Text>
                                <Text className="w-20 text-right">{item.price * item.quantity}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View className="rounded-lg bg-gray-50 p-4 shadow-xs">
                    <Text className="mb-2 text-lg font-semibold">Total</Text>
                    <View className="flex-row justify-between">
                        <Text>Subtotal</Text>
                        <Text >$3,000.00</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text>Tax (10%)</Text>
                        <Text >$300</Text>
                    </View>
                </View>

                <Button title="Generate Invoice" className="mt-4" onPress={() => { }} />
            </View>
        </KeyboardAwareScrollView>
    )
}