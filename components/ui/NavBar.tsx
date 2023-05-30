import Image from 'next/image';
import NextLink from 'next/link';
import { Spacer, Text, useTheme, Link } from '@nextui-org/react';


export const Navbar = () => {

    const { theme } = useTheme()

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '10px ',
            backgroundColor: theme?.colors.gray100.value
        }}>
            <Image 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                alt="icono de la app"
                width={70}
                height={70}
            />

            <NextLink href="/" passHref>
                <Text color='white' h2>Pokémon</Text>
            </NextLink>

            <Spacer css={{ flex: 1 }}/>
            
            <NextLink href="/favorites" passHref>
                    <Text css={{ marginRight: '10px', fontSize:'24px' , fontWeight:'$semibold'}} color='white'>Favoritos</Text>
            </NextLink>

        </div>
    )
};