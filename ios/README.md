# Xcode Cloud Setup Guide

Automated CI/CD for building and deploying your React Native iOS app to App Store Connect using Xcode Cloud.

## What is Xcode Cloud?

Xcode Cloud is Apple's continuous integration and delivery service built into Xcode. It provides:
- ☁️ **Cloud-based builds** - No need for local Mac hardware
- 🔄 **Automated workflows** - Build, test, and distribute automatically
- 📱 **TestFlight integration** - Direct deployment to TestFlight
- 🎯 **App Store deployment** - Streamlined release process
- 🆓 **Free tier** - 25 compute hours/month for free

## Prerequisites

- **Apple Developer Account** (paid membership required - $99/year)
- **App created in App Store Connect**
- **Xcode 13 or later** installed on your Mac
- **Git repository** (GitHub, GitLab, Bitbucket, or Apple's Git)
- **Bundle identifier** configured in your project

## Initial Setup

### 1. Configure Your App in Xcode

**Open your project:**
```bash
cd ios
open RapidBoilerplate.xcworkspace
```

**Update Bundle Identifier:**
1. Select the project in Xcode navigator
2. Select the **RapidBoilerplate** target
3. Go to **Signing & Capabilities** tab
4. Update **Bundle Identifier** from `org.reactjs.native.example.RapidBoilerplate` to your own (e.g., `com.yourcompany.yourapp`)
5. Select your **Team** from the dropdown
6. Enable **Automatically manage signing**

**Tip**: You can also use `react-native-rename` to change the bundle ID:
```bash
npx react-native-rename "YourAppName" -b com.yourcompany.yourapp
```

### 2. Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click **Apps** → **+** (Add App)
3. Fill in the details:
   - **Platform**: iOS
   - **Name**: Your app name
   - **Primary Language**: English (or your preference)
   - **Bundle ID**: Select the bundle ID you configured in Xcode
   - **SKU**: Unique identifier (e.g., `yourapp-ios`)
4. Click **Create**

### 3. Connect Git Repository

Xcode Cloud needs access to your source code repository.

**In Xcode:**
1. Go to **Product** → **Xcode Cloud** → **Create Workflow**
2. Select your project and click **Next**
3. Choose your Git provider:
   - **GitHub** (recommended)
   - **GitLab**
   - **Bitbucket**
   - **Other Git** (self-hosted)
4. Click **Grant Access** and authorize Xcode Cloud
5. Select your repository and branch (usually `main` or `master`)

**Alternative - In App Store Connect:**
1. Go to your app
2. Navigate to **Xcode Cloud** tab
3. Click **Get Started**
4. Follow the prompts to connect your repository

## Setting Up Xcode Cloud Workflow

### 1. Create Workflow in Xcode

**Method 1: Using Xcode (Recommended)**

1. Open your project in Xcode
2. Go to **Product** → **Xcode Cloud** → **Create Workflow**
3. Select your app target (**RapidBoilerplate**)
4. Click **Next**

**Configure Workflow:**
- **Workflow Name**: "Production Release" (or your preference)
- **Description**: "Build and deploy to TestFlight"

**Method 2: Using App Store Connect**

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select your app
3. Go to **Xcode Cloud** tab
4. Click **Create Workflow**

### 2. Configure Build Environment

Xcode Cloud automatically detects React Native projects, but you need to customize the build script.

**The project already includes `ios/ci_scripts/ci_post_clone.sh`** which:
- Installs Homebrew dependencies
- Installs Node.js 20
- Installs Yarn
- Runs `yarn install`
- Installs CocoaPods dependencies
- Fixes RCT-Folly compatibility issue

**Verify the script exists:**
```bash
ls -la ios/ci_scripts/ci_post_clone.sh
```

This script runs automatically after Xcode Cloud clones your repository.

### 3. Configure Workflow Settings

**Environment:**
1. In the workflow editor, go to **Environment** tab
2. **Xcode Version**: Select latest stable version (e.g., 16.x)
3. **macOS Version**: Automatically selected based on Xcode version
4. **Clean**: Enable "Clean before build" (recommended)

**Start Conditions:**
1. Go to **Start Conditions** tab
2. Configure when builds should trigger:

**Option A: Automatic on Branch Changes (Recommended)**
- **Branch Changes**: Enable
- **Branch**: `main` (or your production branch)
- This triggers a build on every push to main

**Option B: Manual Trigger**
- Disable automatic triggers
- Start builds manually from Xcode or App Store Connect

**Option C: Tag-based Releases**
- **Tag Changes**: Enable
- **Tag Pattern**: `v*` (matches v1.0.0, v1.0.1, etc.)
- This triggers builds only when you create a release tag

### 4. Configure Actions

**Archive Action:**
1. Go to **Actions** tab
2. The **Archive** action should be pre-configured
3. Verify settings:
   - **Scheme**: RapidBoilerplate
   - **Platform**: iOS
   - **Configuration**: Release

**Post-Actions:**
1. **TestFlight Internal Testing**: Enable to automatically distribute to internal testers
2. **TestFlight External Testing**: Enable for external beta testing (requires App Review)
3. **App Store**: Enable for automatic App Store submission (requires manual release)

### 5. Configure Post-Actions (Distribution)

**TestFlight Distribution:**
1. In **Actions** tab, expand **Archive**
2. Enable **TestFlight Internal Testing**
3. Select test groups:
   - **App Store Connect Users**: Your team members
   - Create custom groups in App Store Connect if needed

**What to Distribute:**
- **Build**: The archived app
- **Groups**: Select which tester groups receive the build
- **Notify Testers**: Enable to send email notifications

## Environment Variables & Secrets

If your app requires environment variables (API keys, etc.):

### 1. Add Environment Variables

**In Xcode Cloud Workflow:**
1. Go to **Environment** tab
2. Scroll to **Environment Variables**
3. Click **+** to add variables
4. Add your variables:
   - `API_KEY`: Your API key
   - `ENVIRONMENT`: production
   - etc.

**In Code:**
Access via `process.env` in JavaScript or `ProcessInfo.processInfo.environment` in Swift.

### 2. Add Secrets

For sensitive data:
1. In workflow settings, go to **Environment** tab
2. Under **Secrets**, click **+**
3. Add secret name and value
4. Secrets are encrypted and not visible after creation

## Advanced Configuration

### Custom Build Scripts

The project uses `ios/ci_scripts/ci_post_clone.sh` for setup. You can add more scripts:

**Available script hooks:**
- `ci_post_clone.sh` - Runs after repository clone (already configured)
- `ci_pre_xcodebuild.sh` - Runs before Xcode build
- `ci_post_xcodebuild.sh` - Runs after Xcode build

**Example: Add version bumping**

Create `ios/ci_scripts/ci_pre_xcodebuild.sh`:
```bash
#!/bin/sh

# Auto-increment build number
cd "$CI_WORKSPACE/ios"
agvtool next-version -all
```

Make it executable:
```bash
chmod +x ios/ci_scripts/ci_pre_xcodebuild.sh
```



### Version Management

**Current version settings:**
- **Version**: 1.0 (MARKETING_VERSION)
- **Build**: 1 (CURRENT_PROJECT_VERSION)

**To update version:**
1. Open Xcode
2. Select project → Target → General
3. Update **Version** and **Build** numbers

**Or use command line:**
```bash
# Set version
agvtool new-marketing-version 1.1.0

# Increment build number
agvtool next-version -all
```

### Multiple Workflows

Create different workflows for different purposes:

**Development Workflow:**
- Trigger: Push to `develop` branch
- Action: Build only (no distribution)
- Purpose: Verify builds don't break

**Staging Workflow:**
- Trigger: Push to `staging` branch
- Action: Build + TestFlight Internal
- Purpose: Internal team testing

**Production Workflow:**
- Trigger: Tag matching `v*`
- Action: Build + TestFlight External + App Store
- Purpose: Release to users

## Running Your First Build

### 1. Commit and Push

Ensure your code is committed and pushed:
```bash
git add .
git commit -m "Configure Xcode Cloud"
git push origin main
```

### 2. Start Build

**Option A: Automatic (if configured)**
- Build starts automatically on push to configured branch

**Option B: Manual Start**

**From Xcode:**
1. Go to **Product** → **Xcode Cloud** → **Manage Workflows**
2. Select your workflow
3. Click **Start Build**

**From App Store Connect:**
1. Go to your app → **Xcode Cloud**
2. Select workflow
3. Click **Start Build**

### 3. Monitor Build Progress

**In Xcode:**
1. Go to **Product** → **Xcode Cloud** → **Manage Workflows**
2. Click on the running build
3. View real-time logs and progress

**In App Store Connect:**
1. Go to your app → **Xcode Cloud**
2. View build status and logs

**Build typically takes 15-30 minutes** for React Native apps.

### 4. View Build Results

**Success:**
- ✅ Build completes
- 📱 App appears in TestFlight (if configured)
- 📧 Testers receive notification email

**Failure:**
- ❌ Build fails
- 📋 Check logs for errors
- 🔧 Fix issues and push again

## Troubleshooting

### Build Fails: "Command PhaseScriptExecution failed"

**Cause**: Script execution error in `ci_post_clone.sh`

**Solutions:**
- Check script has execute permissions: `chmod +x ios/ci_scripts/ci_post_clone.sh`
- Verify script syntax (no Windows line endings)
- Check Xcode Cloud logs for specific error
- Test script locally: `sh ios/ci_scripts/ci_post_clone.sh`

### Build Fails: "No such module 'React'"

**Cause**: CocoaPods dependencies not installed

**Solutions:**
- Verify `ci_post_clone.sh` runs `pod install`
- Check that Podfile.lock is committed to repository
- Ensure Node.js and Yarn are installed in script

### Build Fails: "Provisioning profile doesn't match"

**Cause**: Signing configuration issue

**Solutions:**
- Enable "Automatically manage signing" in Xcode
- Verify your Apple Developer account has necessary certificates
- Check that bundle identifier matches App Store Connect

### Build Succeeds but App Crashes

**Cause**: Runtime configuration issue

**Solutions:**
- Check environment variables are set correctly
- Verify all required secrets are configured
- Test the build locally with Release configuration:
  ```bash
  cd ios
  xcodebuild -workspace RapidBoilerplate.xcworkspace \
    -scheme RapidBoilerplate \
    -configuration Release \
    -destination 'generic/platform=iOS'
  ```

### "Repository not found" Error

**Cause**: Xcode Cloud doesn't have access to repository

**Solutions:**
- Re-authorize Xcode Cloud access to your Git provider
- Verify repository URL is correct
- Check repository is not private (or grant access if private)

### Slow Builds

**Causes & Solutions:**
- **Large dependencies**: Consider caching with custom scripts
- **Clean builds**: Disable "Clean before build" for faster incremental builds
- **Heavy processing**: Optimize `ci_post_clone.sh` script
- **Free tier limits**: Upgrade to paid plan for more compute resources

## Best Practices

### 1. Version Control

✅ **Commit these files:**
- `ios/ci_scripts/` - Build scripts
- `ios/Podfile.lock` - Dependency lock file
- `ios/RapidBoilerplate.xcodeproj/` - Project configuration
- `.xcode.env` - Xcode environment configuration

❌ **Don't commit:**
- `ios/Pods/` - CocoaPods dependencies (regenerated)
- `ios/build/` - Build artifacts
- `.xcode.env.local` - Local environment overrides

### 2. Branch Strategy

**Recommended setup:**
- `main` → Production releases (App Store)
- `staging` → Beta testing (TestFlight External)
- `develop` → Internal testing (TestFlight Internal)
- Feature branches → No automatic builds

### 3. Testing Before Release

1. **Internal TestFlight** - Team testing
2. **External TestFlight** - Beta testers (requires App Review)
3. **App Store** - Public release

### 4. Monitoring

- **Enable notifications** for build status
- **Review logs** for warnings even on successful builds
- **Monitor TestFlight feedback** from testers
- **Track crash reports** in App Store Connect

### 5. Cost Management

**Free tier includes:**
- 25 compute hours/month
- Unlimited team members
- Unlimited workflows

**Tips to stay within free tier:**
- Use tag-based releases instead of every commit
- Disable automatic builds on feature branches
- Clean up old workflows you don't use

## Deployment to App Store

### 1. TestFlight Distribution

After successful build:
1. Build appears in **App Store Connect** → **TestFlight**
2. Add testers or groups
3. Testers receive email with TestFlight link
4. Testers install TestFlight app and download your build

### 2. App Store Submission

**Manual submission (recommended):**
1. Go to **App Store Connect** → **App Store**
2. Create new version
3. Select build from TestFlight
4. Fill in release notes, screenshots, etc.
5. Submit for review

**Automatic submission:**
- Configure in Xcode Cloud workflow
- Build automatically submits after TestFlight
- Still requires manual metadata and screenshots

## Additional Resources

- [Xcode Cloud Documentation](https://developer.apple.com/documentation/xcode/xcode-cloud)
- [Xcode Cloud Workflows](https://developer.apple.com/documentation/xcode/configuring-your-first-xcode-cloud-workflow)
- [App Store Connect](https://appstoreconnect.apple.com/)
- [TestFlight Documentation](https://developer.apple.com/testflight/)
- [React Native iOS Guide](https://reactnative.dev/docs/running-on-device)

## Support

For issues with:
- **Xcode Cloud**: Check [Apple Developer Forums](https://developer.apple.com/forums/tags/xcode-cloud)
- **App Store Connect**: See [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
- **This project**: Review build logs in Xcode Cloud and check `ios/ci_scripts/` configuration

## Quick Reference

### Common Commands

```bash
# Open project in Xcode
cd ios && open RapidBoilerplate.xcworkspace

# Install dependencies
cd ios && bundle exec pod install

# Test build script locally
sh ios/ci_scripts/ci_post_clone.sh

# Update version
agvtool new-marketing-version 1.1.0

# Increment build number
agvtool next-version -all

# Clean build
cd ios && xcodebuild clean
```

### Workflow Configuration Checklist

- [ ] Repository connected to Xcode Cloud
- [ ] Bundle identifier configured
- [ ] Signing configured (Automatically manage signing enabled)
- [ ] App created in App Store Connect
- [ ] Workflow created with correct branch/tag
- [ ] `ci_post_clone.sh` script exists and is executable
- [ ] Environment variables configured (if needed)
- [ ] TestFlight distribution enabled
- [ ] Test groups configured
- [ ] First build triggered and successful

### File Structure

```
ios/
├── ci_scripts/
│   └── ci_post_clone.sh          # Xcode Cloud setup script (required)
├── RapidBoilerplate.xcodeproj/   # Xcode project
├── RapidBoilerplate.xcworkspace/ # Workspace (use this to open)
├── Podfile                        # CocoaPods dependencies
├── Podfile.lock                   # Dependency lock file (commit this)
└── README.md                      # This file
```
