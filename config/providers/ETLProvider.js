module.exports = {
  type: "ETL",
  transforms: [
    {
      domain: "tickets_inout",
      method: "post",
      mode: "upsert",
      sendTransformedPayload: true,
      routes: [
          "/mobileticket/submit"
      ],
      module: "lib/transforms/ticket.js"
    }
  ]
};
