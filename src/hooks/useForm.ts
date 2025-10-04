import {useCallback, useRef, useState} from 'react';
import {z} from 'zod';

export type FieldValues = Record<string, any>;

export type FieldError = {
  type: string;
  message: string;
};

export type FieldErrors<TFieldValues extends FieldValues> = {
  [K in keyof TFieldValues]?: FieldError;
};

export type FormState<TFieldValues extends FieldValues> = {
  errors: FieldErrors<TFieldValues>;
  touchedFields: Partial<Record<keyof TFieldValues, boolean>>;
  dirtyFields: Partial<Record<keyof TFieldValues, boolean>>;
  isSubmitting: boolean;
  isValidating: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
};

export type ValidationMode = 'onBlur' | 'onChange' | 'onSubmit' | 'all';

export type UseFormProps<TFieldValues extends FieldValues> = {
  defaultValues?: Partial<TFieldValues>;
  validationSchema?: z.ZodSchema<TFieldValues>;
  mode?: ValidationMode;
  reValidateMode?: ValidationMode;
};

export type FieldPath<TFieldValues extends FieldValues> = keyof TFieldValues & string;

export type UseFormRegisterReturn = {
  value: any;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  ref: (instance: any) => void;
};

export type UseFormReturn<TFieldValues extends FieldValues> = {
  register: (name: FieldPath<TFieldValues>) => UseFormRegisterReturn;
  handleSubmit: (
    onValid: (data: TFieldValues) => void | Promise<void>,
    onInvalid?: (errors: FieldErrors<TFieldValues>) => void
  ) => () => Promise<void>;
  formState: FormState<TFieldValues>;
  setValue: (name: FieldPath<TFieldValues>, value: any, options?: {shouldValidate?: boolean; shouldDirty?: boolean; shouldTouch?: boolean}) => void;
  getValue: (name: FieldPath<TFieldValues>) => any;
  getValues: () => TFieldValues;
  setError: (name: FieldPath<TFieldValues>, error: FieldError) => void;
  clearErrors: (name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[]) => void;
  reset: (values?: Partial<TFieldValues>) => void;
  watch: (name?: FieldPath<TFieldValues>) => any;
  trigger: (name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[]) => Promise<boolean>;
  control: {
    _formValues: TFieldValues;
    _defaultValues: Partial<TFieldValues>;
    _formState: FormState<TFieldValues>;
    _fields: Map<string, any>;
    register: (name: FieldPath<TFieldValues>) => UseFormRegisterReturn;
    setValue: UseFormReturn<TFieldValues>['setValue'];
    getValue: UseFormReturn<TFieldValues>['getValue'];
    setError: UseFormReturn<TFieldValues>['setError'];
    clearErrors: UseFormReturn<TFieldValues>['clearErrors'];
    trigger: UseFormReturn<TFieldValues>['trigger'];
  };
};

export function useForm<TFieldValues extends FieldValues = FieldValues>(
  props: UseFormProps<TFieldValues> = {}
): UseFormReturn<TFieldValues> {
  const {
    defaultValues = {} as Partial<TFieldValues>,
    validationSchema,
    mode = 'onSubmit',
    reValidateMode = 'onChange',
  } = props;

  const [formValues, setFormValues] = useState<TFieldValues>({...defaultValues} as TFieldValues);
  const [formState, setFormState] = useState<FormState<TFieldValues>>({
    errors: {},
    touchedFields: {},
    dirtyFields: {},
    isSubmitting: false,
    isValidating: false,
    isValid: true,
    isDirty: false,
    submitCount: 0,
  });

  const defaultValuesRef = useRef(defaultValues);
  const fieldsRef = useRef(new Map());

  const validateField = useCallback(
    async (name: FieldPath<TFieldValues>, value: any): Promise<FieldError | null> => {
      if (!validationSchema) return null;

      try {
        await validationSchema.parseAsync({...formValues, [name]: value});
        return null;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find((err) => err.path[0] === name);
          if (fieldError) {
            return {
              type: fieldError.code,
              message: fieldError.message,
            };
          }
        }
        return null;
      }
    },
    [validationSchema, formValues]
  );

  const validateForm = useCallback(
    async (values: TFieldValues): Promise<FieldErrors<TFieldValues>> => {
      if (!validationSchema) return {};

      try {
        await validationSchema.parseAsync(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: FieldErrors<TFieldValues> = {};
          error.errors.forEach((err) => {
            const fieldName = err.path[0] as keyof TFieldValues;
            if (fieldName) {
              errors[fieldName] = {
                type: err.code,
                message: err.message,
              };
            }
          });
          return errors;
        }
        return {};
      }
    },
    [validationSchema]
  );

  const setValue = useCallback(
    (
      name: FieldPath<TFieldValues>,
      value: any,
      options: {shouldValidate?: boolean; shouldDirty?: boolean; shouldTouch?: boolean} = {}
    ) => {
      const {shouldValidate = false, shouldDirty = true, shouldTouch = false} = options;

      setFormValues((prev) => ({...prev, [name]: value}));

      if (shouldDirty) {
        setFormState((prev) => ({
          ...prev,
          dirtyFields: {...prev.dirtyFields, [name]: value !== defaultValuesRef.current[name]},
          isDirty: true,
        }));
      }

      if (shouldTouch) {
        setFormState((prev) => ({
          ...prev,
          touchedFields: {...prev.touchedFields, [name]: true},
        }));
      }

      if (shouldValidate) {
        validateField(name, value).then((error) => {
          setFormState((prev) => ({
            ...prev,
            errors: error ? {...prev.errors, [name]: error} : {...prev.errors, [name]: undefined},
          }));
        });
      }
    },
    [validateField]
  );

  const getValue = useCallback((name: FieldPath<TFieldValues>) => formValues[name], [formValues]);

  const getValues = useCallback(() => formValues, [formValues]);

  const setError = useCallback((name: FieldPath<TFieldValues>, error: FieldError) => {
    setFormState((prev) => ({
      ...prev,
      errors: {...prev.errors, [name]: error},
      isValid: false,
    }));
  }, []);

  const clearErrors = useCallback((name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[]) => {
    setFormState((prev) => {
      if (!name) {
        return {...prev, errors: {}, isValid: true};
      }

      const names = Array.isArray(name) ? name : [name];
      const newErrors = {...prev.errors};
      names.forEach((n) => {
        delete newErrors[n];
      });

      return {...prev, errors: newErrors, isValid: Object.keys(newErrors).length === 0};
    });
  }, []);

  const trigger = useCallback(
    async (name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[]): Promise<boolean> => {
      setFormState((prev) => ({...prev, isValidating: true}));

      let isValid = true;

      if (!name) {
        const errors = await validateForm(formValues);
        isValid = Object.keys(errors).length === 0;
        setFormState((prev) => ({
          ...prev,
          errors,
          isValid,
          isValidating: false,
        }));
      } else {
        const names = Array.isArray(name) ? name : [name];
        const newErrors = {...formState.errors};

        for (const fieldName of names) {
          const error = await validateField(fieldName, formValues[fieldName]);
          if (error) {
            newErrors[fieldName] = error;
            isValid = false;
          } else {
            delete newErrors[fieldName];
          }
        }

        setFormState((prev) => ({
          ...prev,
          errors: newErrors,
          isValid: Object.keys(newErrors).length === 0,
          isValidating: false,
        }));
      }

      return isValid;
    },
    [formValues, formState.errors, validateField, validateForm]
  );

  const register = useCallback(
    (name: FieldPath<TFieldValues>): UseFormRegisterReturn => {
      if (!fieldsRef.current.has(name)) {
        fieldsRef.current.set(name, {name});
      }

      return {
        value: formValues[name] ?? '',
        onChangeText: (text: string) => {
          setValue(name, text, {
            shouldValidate: mode === 'onChange' || mode === 'all',
            shouldDirty: true,
          });
        },
        onBlur: () => {
          setFormState((prev) => ({
            ...prev,
            touchedFields: {...prev.touchedFields, [name]: true},
          }));

          if (mode === 'onBlur' || mode === 'all') {
            trigger(name);
          } else if (reValidateMode === 'onBlur' && formState.errors[name]) {
            trigger(name);
          }
        },
        ref: (instance: any) => {
          fieldsRef.current.set(name, {...fieldsRef.current.get(name), ref: instance});
        },
      };
    },
    [formValues, mode, reValidateMode, formState.errors, setValue, trigger]
  );

  const handleSubmit = useCallback(
    (
      onValid: (data: TFieldValues) => void | Promise<void>,
      onInvalid?: (errors: FieldErrors<TFieldValues>) => void
    ) => {
      return async () => {
        setFormState((prev) => ({...prev, isSubmitting: true}));

        const errors = await validateForm(formValues);
        const isValid = Object.keys(errors).length === 0;

        setFormState((prev) => ({
          ...prev,
          errors,
          isValid,
          submitCount: prev.submitCount + 1,
        }));

        if (isValid) {
          try {
            await onValid(formValues);
          } catch (error) {
            console.error('Form submission error:', error);
          }
        } else {
          onInvalid?.(errors);
        }

        setFormState((prev) => ({...prev, isSubmitting: false}));
      };
    },
    [formValues, validateForm]
  );

  const reset = useCallback((values?: Partial<TFieldValues>) => {
    const newValues = values ?? defaultValuesRef.current;
    setFormValues({...newValues} as TFieldValues);
    setFormState({
      errors: {},
      touchedFields: {},
      dirtyFields: {},
      isSubmitting: false,
      isValidating: false,
      isValid: true,
      isDirty: false,
      submitCount: 0,
    });
  }, []);

  const watch = useCallback(
    (name?: FieldPath<TFieldValues>) => {
      if (name) {
        return formValues[name];
      }
      return formValues;
    },
    [formValues]
  );

  const control = {
    _formValues: formValues,
    _defaultValues: defaultValuesRef.current,
    _formState: formState,
    _fields: fieldsRef.current,
    register,
    setValue,
    getValue,
    setError,
    clearErrors,
    trigger,
  };

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    getValue,
    getValues,
    setError,
    clearErrors,
    reset,
    watch,
    trigger,
    control,
  };
}

