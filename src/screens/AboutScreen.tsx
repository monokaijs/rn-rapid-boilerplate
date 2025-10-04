import React from 'react';
import {Linking, Pressable, ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppText, Icon} from '@/components/ui';

interface LinkItemProps {
  icon: string;
  label: string;
  value: string;
  url?: string;
}

const LinkItem: React.FC<LinkItemProps> = ({icon, label, value, url}) => {
  const handlePress = () => {
    if (url) {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    }
  };

  return (
    <Pressable
      onPress={url ? handlePress : undefined}
      className={`flex-row items-center py-4 px-4 pr-8 bg-neutrals1000 rounded-full mb-3 ${url ? 'active:bg-neutrals800' : ''}`}
    >
      <View className="w-16 h-16 bg-neutrals800 rounded-full items-center justify-center mr-4">
        <Icon name={icon as any} className="w-5 h-5 text-primary" />
      </View>
      <View className="flex-1">
        <AppText variant="caption" className="text-neutrals400 font-sans-medium mb-1">
          {label}
        </AppText>
        <AppText variant="body" raw className="text-foreground">
          {value}
        </AppText>
      </View>
      {url && (
        <View>
          <Icon name="ExternalLink" className="w-5 h-5 text-neutrals400" />
        </View>
      )}
    </Pressable>
  );
};

export default function AboutScreen() {
  const {t} = useTranslation();

  const handleEmailPress = () => {
    Linking.openURL('mailto:monokaijs@gmail.com').catch(err =>
      console.error('Failed to open email:', err)
    );
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <View className="mb-8">
          <AppText variant="heading2" className="mb-3">
            ABOUT_TITLE
          </AppText>
          <AppText variant="body" color="muted">
            ABOUT_INTRO
          </AppText>
        </View>

        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">
            PROJECT_INFO
          </AppText>

          <LinkItem
            icon="User"
            label={t('PROJECT_BY')}
            value="Edward Nguyen"
          />

          <LinkItem
            icon="Github"
            label={t('GITHUB_REPO')}
            value="rn-rapid-boilerplate"
            url="https://github.com/monokaijs/rn-rapid-boilerplate"
          />
        </View>

        <View className="mb-8">
          <AppText variant="heading3" className="mb-4">
            AUTHOR_CONTACT
          </AppText>

          <LinkItem
            icon="Mail"
            label={t('CONTACT_EMAIL')}
            value="monokaijs@gmail.com"
            url="mailto:monokaijs@gmail.com"
          />

          <LinkItem
            icon="Globe"
            label={t('AUTHOR_WEBSITE')}
            value="monokaijs.com"
            url="https://monokaijs.com"
          />

          <LinkItem
            icon="Github"
            label={t('AUTHOR_GITHUB')}
            value="github.com/monokaijs"
            url="https://github.com/monokaijs"
          />

          <LinkItem
            icon="Linkedin"
            label={t('AUTHOR_LINKEDIN')}
            value="linkedin.com/in/monokaijs"
            url="https://www.linkedin.com/in/monokaijs/"
          />
        </View>

        <View className="mb-8">
          <View className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
            <View className="flex-row items-center mb-3">
              <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center mr-4">
                <Icon name="MessageCircle" className="w-6 h-6 text-primary" />
              </View>
              <AppText variant="heading4" className="flex-1">
                CONTACT_ME
              </AppText>
            </View>

            <AppText variant="body" className="text-primary mb-4">
              CONTACT_ME_DESC
            </AppText>

            <Pressable
              onPress={handleEmailPress}
              className="bg-primary py-3 px-6 rounded-xl flex-row items-center justify-center active:bg-primary/90"
            >
              <Icon name="Mail" className="w-5 h-5 text-primary-foreground mr-2" />
              <AppText variant="label" raw className="text-primary-foreground">
                {t('SEND_EMAIL')}
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

