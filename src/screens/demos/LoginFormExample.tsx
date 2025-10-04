import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {useForm} from '@/hooks/useForm';
import {
  AppButton,
  AppInput,
  AppText,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import {loginFormSchema} from '@/validations/common';
import {z} from 'zod';
import {useToast} from "@/components/ui/ToastProvider.tsx";

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginFormExample() {
  const {showSuccess} = useToast();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    validationSchema: loginFormSchema,
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormValues) => {
    showSuccess(`Login successful!\nEmail: ${data.email}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <AppText variant="heading1" className="mb-2">
            Welcome Back
          </AppText>
          <AppText variant="body" className="text-neutrals100">
            Sign in to your account to continue
          </AppText>
        </View>

        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <AppInput
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel required>Password</FormLabel>
                <FormControl>
                  <AppInput
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <View className="mt-6">
            <AppButton
              variant="primary"
              onPress={form.handleSubmit(onSubmit)}
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
            </AppButton>
          </View>
        </Form>
      </View>
    </KeyboardAvoidingView>
  );
}

