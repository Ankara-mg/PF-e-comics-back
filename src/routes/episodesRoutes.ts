import { Router } from 'express';
import { getDetails } from '../controller/controller.details';
import { getComicsDB, postComics, SearchName, getIssues, addComic_db } from '../controller/episodesController';
import { getRatingAvg } from '../controller/controller.raiting';
;
const router = Router()

router.get('/', getComicsDB)



router.get('/issues/:id',  async (req, res) => {
  const { id } = req.params;
  try {
    let controller_result = await getIssues(id)
    res.json(controller_result)

  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

router.get('/issues/rating/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let controller_result = await getRatingAvg(Number(id))
    res.json(controller_result)

  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})


router.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    let controller_result = await SearchName(name)
    res.json(controller_result)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

router.get('/addComic_db/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let controller_result = await addComic_db(id)
    res.json(controller_result)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let controller_result = await getDetails(id)
    res.json(controller_result)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})


//router.post('/', async (req, res) => {
  //try {
    //let controller = await postComics(req.body)
    //res.json(controller)
  //} catch (error: any) {
    //res.status(500).json({ error: error.message })
  //}

router.post('/' , postComics)

})

export default router;