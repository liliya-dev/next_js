interface Props {
  countryCode: string,
  countryName: string,
  extendedAddress: string,
  locality: string,
  obfuscate: boolean
  postalCode: string,
  region: string,
  streetAddress: string,
}

export const formatAddress = ( address: Props ) => {
  const stringFromAddress = Object.values(address).filter(item => typeof item !== 'boolean').join(', ');
  return stringFromAddress;
}
