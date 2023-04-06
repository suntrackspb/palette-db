import {Link} from "react-router-dom";
import {Box, Card, CardMedia, Grid, ListItem, Typography} from "@mui/material";
import ContentBlock from "../components/ContentBlock/ContentBlock.jsx";
import ColorItem from "../modules/PaletteInfo/components/ColorItem/ColorItem.jsx";
import LinkButton from "../components/LinkButton/LinkButton.jsx";

const MainPage = () => {
  const tags = ['нежные пастельные тона', 'контрастные цвета', 'изумрудный', 'фиолетовый', 'черный и желтый', 'бледно-голубой']
  return (
    <>
      <Background/>
      <Box className='flex-col-c'>
        <Title text='Palette Picker' component='h1' variant='h3' mt={4}/>
        <Paragraph width='60%' textAlign='center' my={2}>
          Портал с базой готовых цветовых палитр для дизайна. Мы предоставляем бесплатный доступ к большому количеству
          цветовых схем, для создания красивого и гармоничного дизайна для любого проекта. <br/>

          У нас вы найдете огромный выбор готовых палитр. Каждая цветовая палитра состоит из нескольких цветов, которые
          идеально подходят друг к другу.
        </Paragraph>
        <LinkButton
          component='span'
          variant='contained'
          color='secondary'
          text='Перейти к палитрам'
          linkTo='palettes'
          padding='12px 24px'
        />
      </Box>

      <Title text='Возможности' component='h2' variant='h4' mt={4}/>

      <Grid container spacing={2} justifyContent='center' alignItems='stretch'>
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
          <Box className='flex-col' sx={{width: 'auto', m: '0 auto', gap: 2}}>
            <ColorItem itemColor='#2fa2db' setSelectedColor={() => {}}/>
            <ColorItem itemColor='#4FE825' setSelectedColor={() => {}}/>
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
              image='https://pp.plutonium-dayz.ru/images/palette-4509.jpg'
            />
          </Card>
        </Block>


      </Grid>
    </>
  )
};

const Block = ({children}) => {
  return <Grid item lg={4} md={6} sm={8} xs={12}>
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
const Title = ({text, component, variant, mt}) => {
  return <Typography
    component={component}
    variant={variant}
    textAlign='center'
    mt={mt}
  >
    {text}
  </Typography>
}
const Paragraph = ({children, width, textAlign, my, variant}) => {
  return <Typography
    component='p'
    variant={variant}
    width={width}
    textAlign={textAlign}
    my={my}
  >
    {children}
  </Typography>
}

const Background = () => {
  return <style>{
    `body { 
      background: linear-gradient(45deg, rgb(252 106 70 / 83%) 0%, rgb(116 63 251 / 78%) 50%, rgb(70 252 232 / 77%) 100%); 
      position: relative;
    }
    body::after {
      content: '';
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0,0,0,.5);
      backdrop-filter: blur(200px);
      z-index: -1;
    }`
  }</style>
}

export default MainPage;