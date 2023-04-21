import {Link} from "react-router-dom";
import {Box, Card, CardMedia, Grid, ListItem, Typography} from "@mui/material";
import ColorItem from "../modules/PaletteInfo/components/ColorItem/ColorItem.jsx";
import {ButtonLink, ContentBlock} from "../components/UI";
import {useEffect, useState} from "react";
import PaletteService from "../api/PaletteService.js";
import PaletteCard from "../components/PaletteCard/PaletteCard";
import LogoTextSlogan from "../components/Logos/LogoTextSlogan.jsx";
import Logo from "../components/Logos/Logo.jsx";
import LogoFull from "../components/Logos/LogoFull.jsx";

//TODO добавить скелетон
const MainPage = () => {
  const tags = ['нежные пастельные тона', 'контрастные цвета', 'изумрудный', 'фиолетовый', 'черный и желтый', 'бледно-голубой']
  const [palettes, setPalettes] = useState([]);
  useEffect(() => {
    PaletteService.getPalettes(0, 4)
      .then(setPalettes)
      .catch(console.log)
  }, []);
  return (
    <>
      <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        flexDirection: {xs: 'column', md: 'row'}
      }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {xs: '1fr', md: '70px auto', lg: '100px auto'},
          gridTemplateRows: 'repeat(2, max-content)',
          width: {xs: '90%', md: '50%'},
          alignSelf: 'center',
          columnGap: 1,
        }}>
          <Logo sx={{
            display: {xs: 'none', md: 'block'},
            gridColumn: '1/2',
            maxWidth: '400px',
            alignSelf: 'center',
            mt: '25px'}}/>

          <LogoTextSlogan sx={{
            display: {xs: 'none', md: 'block'},
            gridColumn: '2/3',
            maxWidth: {xs: '300px', md: '400px', lg: '500px'},
            mt: 5,
            mb: 1}}/>

          <LogoFull sx={{
            display: {xs: 'block', md: 'none'},
            maxWidth: '450px',
            justifySelf: 'center',
            mt: 5
          }}/>

          <Box sx={{
            gridColumn: {xs: '1/3', md: '2/3'},
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Paragraph sx={{
              width: {xs: '80%', lg: '60%'},
              m: {xs: '16px auto', md: '16px 0'},
              textAlign: {xs: 'center', md: 'left'}
            }}>
              Портал с базой готовых цветовых палитр для дизайна. Мы предоставляем бесплатный доступ к большому количеству
              цветовых схем, для создания красивого и гармоничного дизайна для любого проекта. <br/>

              У нас вы найдете огромный выбор готовых палитр. Каждая цветовая палитра состоит из нескольких цветов,
              которые
              идеально подходят друг к другу.
            </Paragraph>
            <ButtonLink
              component='span'
              variant='contained'
              color='secondary'
              text='Перейти к палитрам'
              linkTo='palettes'
              padding='16px 24px'
              sx={{
                width: 'max-content',
                m: {xs: '0 auto', md: '0'}
            }}
            />
          </Box>

        </Box>


        <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 4, width: '40%'}}>
          <Box className='flex-col' sx={{gap: 2, mt: '20px'}}>
            {palettes.filter((_, i) => i < palettes.length / 2).map(palette =>
              <PaletteCard key={palette._id} palette={palette}/>)}
          </Box>
          <Box className='flex-col' sx={{gap: 2, mt: '100px'}}>
            {palettes.filter((_, i) => i >= palettes.length / 2).map(palette =>
              <PaletteCard key={palette._id} palette={palette}/>)}
          </Box>
        </Box>
      </Box>

      <Title textAlign='center' text='Возможности' component='h2' variant='h4' mt={8}/>

      <Grid container spacing={2} justifyContent='center' alignItems='stretch' mb={3}>
        <Block>
          <Title text='Поиск по тегам' component='h3' variant='h6'/>
          <Paragraph variant='body2'>
            Мы понимаем, что выбор цветов для проекта может быть трудной задачей, поэтому мы создали функцию поиска по
            тегам. Это означает, что вы можете найти нужную цветовую палитру, используя ключевые слова. <br/>
            Например:
          </Paragraph>
          <Box component='ul' m='0 auto'>
            {tags.map((tag, i) =>
              <ListItem
                key={i}
                sx={{
                  p: 1,
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,.1)'
                  }
                }}
              >
                <Link to={`/category/${tag}`}>
                  <Typography variant='body2'>{tag}</Typography>
                </Link>
              </ListItem>
            )}
          </Box>
        </Block>

        <Block>
          <Title text='Колорпикер' component='h3' variant='h6'/>
          <Paragraph variant='body2'>
            Наш сайт предоставляет вам возможность использовать колорпикер. Это инструмент, который позволяет вам
            выбирать и сохранять нужные цвета для вашего дизайна. Вы можете выбирать цвета из нашей базы цветовых палитр
            или выбирать свои собственные цвета.
          </Paragraph>
          <Box
            component='ul'
            className='flex-col'
            sx={{
              width: 'auto',
              m: '0 auto',
              gap: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%'
          }}>
            <ColorItem itemColor='#2fa2db' setSelectedColor={() => {
            }}/>
            <ColorItem itemColor='#4FE825' setSelectedColor={() => {
            }}/>
          </Box>
        </Block>

        <Block>
          <Title text='Свои палитры' component='h3' variant='h6'/>
          <Paragraph variant='body2'>
            Кроме того, мы предоставляем уникальную функцию, которая позволяет пользователям добавлять свои собственные
            цветовые палитры. Для этого вам нужно зарегистрироваться и воспользоваться добавлением палитры. Наш
            инструмент автоматически создаст цветовую схему, состоящую из 5 цветов с вашей картинки.
          </Paragraph>
          <Card sx={{bgcolor: 'common.second', m: '0 auto'}}>
            <CardMedia
              component='img'
              width='100px'
              height='100px'
              sx={{height: '200px'}}
              alt='Пример палитры'
              image='https://palettify.sntrk.ru/images/host/palette-4509.webp'
            />
          </Card>
        </Block>


      </Grid>
    </>
  )
};

const Block = ({children}) => {
  return <Grid item lg={4} md={8} sm={10} xs={12}>
    <ContentBlock
      className='flex-col-c'
      styleProps={{
        mt: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minHeight: '100%'
      }}
    >
      {children}
    </ContentBlock>
  </Grid>
}
const Title = ({text, component, variant, mt, textAlign}) => {
  return <Typography
    component={component}
    variant={variant}
    mt={mt}
    textAlign={textAlign}
  >
    {text}
  </Typography>
}
const Paragraph = ({children, width, textAlign, my, variant, sx}) => {
  return <Typography
    component='p'
    variant={variant}
    width={width}
    textAlign={textAlign}
    my={my}
    sx={sx}
  >
    {children}
  </Typography>
}

export default MainPage;