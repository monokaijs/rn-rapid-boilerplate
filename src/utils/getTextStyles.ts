import {TextStyle} from 'react-native';

export const textStyles = {
  // Mobile Styles
  mobileDisplay1: {
    fontFamily: 'SourceSans3-Bold', // Adjusted for bold weight
    fontWeight: 'bold',
    fontSize: 44,
    letterSpacing: 0,
  },
  mobileDisplay2: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 40,
    letterSpacing: 0,
  },
  mobileDisplay3: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 32,
    letterSpacing: 0,
  },
  mobileHeading1: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 0,
  },
  mobileHeading2: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 0,
  },
  mobileHeading3: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0,
  },
  mobileHeading4: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0,
  },
  mobileHeading5: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0,
  },
  mobileFeatureBold: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0,
  },
  mobileFeatureAccent: {
    fontFamily: 'SourceSans3-SemiBold', // Adjusted for 600 weight
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0,
  },
  mobileFeatureEmphasis: {
    fontFamily: 'SourceSans3-Italic', // Adjusted for italic style
    fontStyle: 'italic',
    fontSize: 18,
    letterSpacing: 0,
  },
  mobileFeatureStandard: {
    fontFamily: 'SourceSans3-Regular', // Adjusted for normal weight
    fontWeight: 'normal',
    fontSize: 18,
    letterSpacing: 0,
  },
  mobileHighlightBold: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0,
  },
  mobileHighlightAccent: {
    fontFamily: 'SourceSans3-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0,
  },
  mobileHighlightEmphasis: {
    fontFamily: 'SourceSans3-Italic',
    fontStyle: 'italic',
    fontSize: 16,
    letterSpacing: 0,
  },
  mobileHighlightStandard: {
    fontFamily: 'SourceSans3-Regular',
    fontWeight: 'normal',
    fontSize: 16,
    letterSpacing: 0,
  },
  mobileContentBold: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0,
  },
  mobileContentAccent: {
    fontFamily: 'SourceSans3-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0,
  },
  mobileContentEmphasis: {
    fontFamily: 'SourceSans3-Italic',
    fontStyle: 'italic',
    fontSize: 14,
    letterSpacing: 0,
  },
  mobileContentRegular: {
    fontFamily: 'SourceSans3-Regular',
    fontWeight: 'normal',
    fontSize: 14,
    letterSpacing: 0,
  },
  mobileCaptionAccent: {
    fontFamily: 'SourceSans3-SemiBold',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0,
  },
  mobileCaptionEmphasis: {
    fontFamily: 'SourceSans3-Italic',
    fontStyle: 'italic',
    fontSize: 12,
    letterSpacing: 0,
  },
  mobileCaptionRegular: {
    fontFamily: 'SourceSans3-Regular',
    fontWeight: 'normal',
    fontSize: 12,
    letterSpacing: 0,
  },
  mobileFootnoteAccent: {
    fontFamily: 'SourceSans3-SemiBold',
    fontWeight: '600',
    fontSize: 10,
    letterSpacing: 0,
  },
  mobileFootnoteEmphasis: {
    fontFamily: 'SourceSans3-Italic',
    fontStyle: 'italic',
    fontSize: 10,
    letterSpacing: 0,
  },
  mobileFootnoteRegular: {
    fontFamily: 'SourceSans3-Regular',
    fontWeight: 'normal',
    fontSize: 10,
    letterSpacing: 0,
  },
};

export const getTextStyles = (key: keyof typeof textStyles) => textStyles[key] as TextStyle;
