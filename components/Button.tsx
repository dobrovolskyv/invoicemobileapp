import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';


type ButtonVariant = 'primary' | 'seconadary' | 'link';

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
} & TouchableOpacityProps;


export const Button = forwardRef<View, ButtonProps>(({ title, variant = 'primary', ...touchableProps }, ref) => {
  return (
    <TouchableOpacity ref={ref}
      {...touchableProps}
      className={`${styles[variant].button} ${touchableProps.className}`}> 
      <Text className={styles[variant].text}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = {
  primary: {
    button: 'items-center bg-indigo-500 rounded-[28px] shadow-md p-4',
    text: 'text-white text-lg font-semibold text-center', 
  },
  seconadary: {
    button: 'items-center border-2 border-indigo-500 rounded-[28px] p-4',
    text: 'text-indigo-500 text-lg font-semibold text-center',
  },
  link: {
    button: 'items-center p-4',
    link: 'text-indigo-500 text-lg font-bold text-center',
  }
};

