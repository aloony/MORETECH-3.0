const fs = require('fs');
const datahub = require('../../utils/datahub');
const randomStringGenerator = require('../../utils/randomStringGenerator');

const { isAuth } = require('../../middlewares/auth.middleware');

module.exports = async app => {

  app.post('/add-task', { preValidation: [isAuth()] },
    async function (request, reply) {
      const { body: { dateFrom, dateTo, rowsCount, isPrivate, price, roles, rules, datasets } } = request;

      fs.writeFileSync(`./static/${randomStringGenerator(13)}.json`, JSON.stringify({
        dateFrom,
        dateTo,
        rowsCount,
        isPrivate,
        price,
        roles,
        rules,
        datasets
      }), 'utf8');

      reply.send({ success: true });

    }
  )

  // get datasets
  app.get('/', { preValidation: [isAuth()] },
    async function (request, reply) {

      let datahubData = await datahub()

      reply.send({
        success: true,
        datasets: datahubData[0],
        dataCatalog: datahubData[1]
      });
    }
  )

}