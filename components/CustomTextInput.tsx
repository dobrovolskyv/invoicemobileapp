import { Control, Controller, useController } from "react-hook-form";
import { TextInput, TextInputProps, View, Text } from "react-native";

type CustomTextInputProps = {
    name: string;
    label: string;


} & TextInputProps;

export default function CustomTextInput({ label, name, ...props }: CustomTextInputProps) {

    const {
        field: { onChange, onBlur, value },
        fieldState: { error } } = useController({
            name,
            rules: { required: "Name is requred" }
        })
    return (
        <View className='mb-4'>
            <Text className='mb-4 gap-2 '>{label}</Text>
            <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value?.toString()}
                {...props}
                className={`rounded border border-gray-300 p-4 ${props.className}`}
            />
            <Text className="text-red-500">{error?.message}</Text>
        </View>

    )
}