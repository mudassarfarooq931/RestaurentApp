import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageHelperText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  bioContainer: {
    height: 'auto',
    minHeight: 80,
  },
  bioInput: {
    textAlignVertical: 'top',
    paddingTop: 15,
    paddingBottom: 15,
    minHeight: 80,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 20,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.lighterGray,
    marginVertical: 20,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
    lineHeight: 20,
  },
  warningCard: {
    backgroundColor: colors.lightYellow,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.orange,
  },
  warningText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.darkGray,
    lineHeight: 20,
  },
});
