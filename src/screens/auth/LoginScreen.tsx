import React, {useState} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {z} from 'zod';
import AuthContainer from '@/components/auth/AuthContainer';
import AppInput from '@/components/ui/AppInput';
import AppButton from '@/components/ui/AppButton';
import Icon from '@/components/ui/Icon';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<LoginFormData> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(() => resolve(null), 2000));
      Alert.alert('Success', 'Login successful!', [
        {text: 'OK', onPress: () => navigation.navigate('Main')},
      ]);
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof LoginFormData, value: string) => {
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
            Welcome Back
          </Text>
          <Text className="text-base font-sans-regular text-neutrals100 text-center">
            Sign in to your account
          </Text>
        </View>

        <View className="gap-4 mb-6">
          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={value => updateFormData('email', value)}
            errorText={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            leftIcon={<Icon name="Mail" className="w-5 h-5 text-neutrals100"/>}
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={value => updateFormData('password', value)}
            errorText={errors.password}
            secureTextEntry={!showPassword}
            autoComplete="password"
            leftIcon={<Icon name="Lock" className="w-5 h-5 text-neutrals100"/>}
            rightIcon={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'EyeOff' : 'Eye'}
                  className="w-5 h-5 text-neutrals100"
                />
              </Pressable>
            }
          />
        </View>

        <Pressable className="mb-6">
          <Text className="text-primary font-sans-medium text-right">
            Forgot Password?
          </Text>
        </Pressable>

        <AppButton
          variant="primary"
          onPress={handleLogin}
          disabled={isLoading}
          className="mb-6">
          {isLoading ? 'Signing In...' : 'Sign In'}
        </AppButton>

        <View className="flex-row justify-center items-center">
          <Text className="text-neutrals100 font-sans-regular">
            Don't have an account?{' '}
          </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text className="text-primary font-sans-medium">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </AuthContainer>
  );
}
