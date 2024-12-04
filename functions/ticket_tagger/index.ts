import { client, publicSDK } from '@devrev/typescript-sdk';
import { WorksUpdateRequestTags } from '@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk';
import axios from 'axios';
import { model } from './gemini';

type PartListEle = {
  id: string;
  name: string;
  type: string;
  description: string;
};

function getTagType(tag: string): publicSDK.PartType {
  switch (tag) {
    case 'product':
      return publicSDK.PartType.Product;
    case 'feature':
      return publicSDK.PartType.Feature;
    case 'enhancement':
      return publicSDK.PartType.Enhancement;
    case 'capability':
      return publicSDK.PartType.Capability;
    default:
      return publicSDK.PartType.Product;
  }
}

function getPartId(partName: string, partList: Array<PartListEle>) {
  const result = partList.filter((ele: PartListEle) => {
    ele.name == partName;
  });

  if (result.length > 0) {
    return result[0].id;
  }
  return partList[0].id;
}

async function getGeminiResponse(title: string, body: string, partsData: Array<PartListEle>, predictedClass: string) {
  return JSON.parse(
    (
      await model.generateContent(`Work Title: ${title}

Work description: ${body}

Parts Details: ${JSON.stringify(partsData)}

External model prediction: ${predictedClass}`)
    ).response.text()
  );
}

export const run = async (events: any[]) => {
  for (const event of events) {
    const endpoint = event.execution_metadata.devrev_endpoint;
    const token = event.context.secrets.service_account_token;
    let title = event.payload.work_created.work.title;
    let body = event.payload.work_created.work.body;
    const ticketId = event.payload.work_created.work.id;

    const devrevSDK = client.setup({ endpoint, token });

    const partsData =
      (await devrevSDK.partsList()).data.parts.map((ele) => {
        return {
          type: ele.type ?? 'Does not belong to any type',
          name: ele.name ?? 'No Name available',
          description: ele.description ?? 'No Description available',
          id: ele.id,
        } as PartListEle;
      }) ?? [];

    console.log('LOGS', title + ' ' + body);

    try {
      // const modelRes = await axios.post('https://snap-in-ticket-classification.onrender.com/predict', {
      //   text: title + ' ' + body,
      // });

      // const predictedClass = modelRes.data.prediction;
      // console.log('PREDICTED', predictedClass);
      const predictedClass = 'text';
      const geminiRes = await getGeminiResponse(title, body, partsData, predictedClass);

      // if(predictedClass === null || predictedClass === undefined
      //   || geminiRes.part === null || geminiRes === undefined
      // ){
      //   throw new Error("Sorting was unsuccessfull")
      // }

      await devrevSDK.worksUpdate({
        // type: publicSDK.WorkType.Ticket,
        title: title,
        body: `Summary: ${geminiRes.summary ?? 'No summary available'}

      ${body ?? ''}

      Event: ${JSON.stringify(event) ?? ''}`,
        id: ticketId,
        tags: getTagType(predictedClass) as unknown as publicSDK.WorksUpdateRequestTags,
        applies_to_part: getPartId(geminiRes.part, partsData),
      });
    } catch (error) {
      // console.log('catch logs', error);
      // await devrevSDK.worksUpdate(event.payload.work_created.work);
      console.log('catch logs', error);
    }
  }
};

export default run;
