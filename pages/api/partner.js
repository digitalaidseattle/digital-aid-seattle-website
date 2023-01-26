import Airtable from 'airtable'

const base = Airtable.base('apprZrgVYuYaUHuhk')
export default function handler(req, res) {
  const body = req.body
  base('tblqhOkuTYhqsGT45').create({ ...body }, function (err, record) {
    if (err) {
      console.error(err)
      res.status(400).json({ error: err })
      return
    }

    console.log(record)
    res.status(200).json({ data: { record }, error: err })
    return
  })
}
