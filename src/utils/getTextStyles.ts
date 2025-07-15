import {TextStyle} from 'react-native';

export const textStyles = {
  // Mobile Styles
  display1: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 44,
    letterSpacing: 0,
  },
  display2: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 40,
    letterSpacing: 0,
  },
  display3: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 32,
    letterSpacing: 0,
  },
  heading1: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 0,
  },
  heading2: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 0,
  },
  heading3: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0,
  },
  heading4: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0,
  },
  heading5: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0,
  },
  featureBold: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0,
  },
  featureAccent: {
    fontFamily: 'SourceSans3-SemiBold', // Adjusted for 600 weight
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0,
  },
  featureEmphasis: {
    fontFamily: 'SourceSans3-Italic', // Adjusted for italic style
    fontStyle: 'italic',
    fontSize: 18,
    letterSpacing: 0,
  },
  featureStandard: {
    fontFamily: 'SourceSans3-Regular', // Adjusted for normal weight
    fontWeight: 'normal',
    fontSize: 18,
    letterSpacing: 0,
  },
  highlightBold: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0,
  },
  highlightAccent: {
    fontFamily: 'SourceSans3-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0,
  },
  highlightEmphasis: {
    fontFamily: 'SourceSans3-Italic',
    fontStyle: 'italic',
    fontSize: 16,
    letterSpacing: 0,
  },
  highlightStandard: {
    fontFamily: 'SourceSans3-Regular',
    fontWeight: 'normal',
    fontSize: 16,
    letterSpacing: 0,
  },
  contentBold: {
    fontFamily: 'SourceSans3-Bold',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0,
  },
  contentAccent: {
    fontFamily: 'SourceSans3-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0,
  },
  contentEmphasis: {
    fontFamily: 'SourceSans3-Italic',
    fontStyle: 'italic',
    fontSize: 14,
    letterSpacing: 0,
  },
  contentRegular: {
    fontFamily: 'SourceSans3-Regular',
    fontWeight: 'normal',
    fontSize: 14,
    letterSpacing: 0,
  },
  captionAccent: {
    fontFamily: 'SourceSans3-SemiBold',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0,
  },
  captionEmphasis: {
    fontFamily: 'SourceSans3-Italic',
    fontStyle: 'italic',
    fontSize: 12,
    letterSpacing: 0,
  },
  captionRegular: {
    fontFamily: 'SourceSans3-Regular',
    fontWeight: 'normal',
    fontSize: 12,
    letterSpacing: 0,
  },
  footnoteAccent: {
    fontFamily: 'SourceSans3-SemiBold',
    fontWeight: '600',
    fontSize: 10,
    letterSpacing: 0,
  },
  footnoteEmphasis: {
    fontFamily: 'SourceSans3-Italic',
    fontStyle: 'italic',
    fontSize: 10,
    letterSpacing: 0,
  },
  footnoteRegular: {
    fontFamily: 'SourceSans3-Regular',
    fontWeight: 'normal',
    fontSize: 10,
    letterSpacing: 0,
  },
};

export const getTextStyles = (key: keyof typeof textStyles) => textStyles[key] as TextStyle;
