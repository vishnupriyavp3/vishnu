import Instance from './Instance';
export const Getdata = (url) => Instance.get(url);
export const AddData = (url, data) => Instance.post(url, data);
export const EditData = (url) => Instance.get(url);
export const DeleteData = (url) => Instance.delete(url);
export const SetEditData = (url, data) => Instance.put(url, data);
