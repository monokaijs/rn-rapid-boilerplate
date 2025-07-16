import React, {useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {z} from 'zod';
import AuthContainer from '@/components/auth/AuthContainer';
import AppInput from '@/components/ui/AppInput';
import AppButton from '@/components/ui/AppButton';
import Icon from '@/components/ui/Icon';
import Checkbox from '@/components/ui/Checkbox';
import {RootStackScreenProps} from '@/navigation/types';

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine(val => val, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const navigation = useNavigation<RootStackScreenProps<'Register'>['navigation']>();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    try {
      registerSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof RegisterFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(() => resolve(null), 2000));
      Alert.alert('Success', 'Account created successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Login')},
      ]);
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  return (
    <AuthContainer>
      <View className="flex-1 justify-center">
        <View className="mb-8">
          <Text className="text-3xl font-sans-bold text-foreground text-center mb-2">
            Create Account
          </Text>
          <Text className="text-base font-sans-regular text-neutrals100 text-center">
            Sign up to get started
          </Text>
        </View>

        <View className="gap-4 mb-6">
          <AppInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={value => updateFormData('fullName', value)}
            errorText={errors.fullName}
            autoComplete="name"
            leftIcon={<Icon name="User" className="w-5 h-5 text-neutrals100" />}
          />

          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={value => updateFormData('email', value)}
            errorText={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            leftIcon={<Icon name="Mail" className="w-5 h-5 text-neutrals100" />}
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={value => updateFormData('password', value)}
            errorText={errors.password}
            secureTextEntry={!showPassword}
            autoComplete="new-password"
            leftIcon={<Icon name="Lock" className="w-5 h-5 text-neutrals100" />}
            rightIcon={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'EyeOff' : 'Eye'}
                  className="w-5 h-5 text-neutrals100"
                />
              </Pressable>
            }
          />

          <AppInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={value => updateFormData('confirmPassword', value)}
            errorText={errors.confirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoComplete="new-password"
            leftIcon={<Icon name="Lock" className="w-5 h-5 text-neutrals100" />}
            rightIcon={
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon
                  name={showConfirmPassword ? 'EyeOff' : 'Eye'}
                  className="w-5 h-5 text-neutrals100"
                />
              </Pressable>
            }
          />
        </View>

        <View className="mb-6">
          <Checkbox
            checked={formData.agreeToTerms}
            onValueChange={(checked) => updateFormData('agreeToTerms', checked)}
            label={
              <Text className="text-neutrals100 font-sans-regular ml-2">
                I agree to the{' '}
                <Text className="text-primary font-sans-medium">Terms of Service</Text>
                {' '}and{' '}
                <Text className="text-primary font-sans-medium">Privacy Policy</Text>
              </Text>
            }
          />
          {errors.agreeToTerms && (
            <Text className="text-error text-sm font-sans-regular mt-1">
              {errors.agreeToTerms}
            </Text>
          )}
        </View>

        <AppButton
          variant="primary"
          onPress={handleRegister}
          disabled={isLoading}
          className="mb-6">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </AppButton>

        <View className="flex-row justify-center items-center">
          <Text className="text-neutrals100 font-sans-regular">
            Already have an account?{' '}
          </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="text-primary font-sans-medium">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </AuthContainer>
  );
}
